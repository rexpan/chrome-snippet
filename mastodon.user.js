// ==UserScript==
// @name            mastodon
// @namespace       http://tampermonkey.net/
// @version         2026.08.27
// @description     Redirect Mastodon links to my Elk client, resolved against my own instance
// @author          Rex Pan <napxer@gmail.com>
// @match           https://chaos.social/*
// @match           https://cyberplace.social/*
// @match           https://defcon.social/*
// @match           https://fedi.simonwillison.net/*
// @match           https://fediscience.org/*
// @match           https://floss.social/*
// @match           https://fosstodon.org/*
// @match           https://front-end.social/*
// @match           https://hachyderm.io/*
// @match           https://hci.social/*
// @match           https://indieweb.social/*
// @match           https://infosec.exchange/*
// @match           https://ioc.exchange/*
// @match           https://mas.to/*
// @match           https://mastodon.art/*
// @match           https://mastodon.gamedev.place/*
// @match           https://mastodon.online/*
// @match           https://mastodon.social/*
// @match           https://mastodon.world/*
// @match           https://mathstodon.xyz/*
// @match           https://mstdn.social/*
// @match           https://phpc.social/*
// @match           https://ruby.social/*
// @match           https://scholar.social/*
// @match           https://sfba.social/*
// @match           https://tech.lgbt/*
// @match           https://techhub.social/*
// @match           https://toot.cafe/*
// @match           https://universeodon.com/*
// @match           https://vis.social/*
// @match           https://wandering.shop/*
// @grant           none
// @noframes
// @updateURL       https://github.com/rexpan/chrome-snippet/raw/master/mastodon.user.js
// @downloadURL     https://github.com/rexpan/chrome-snippet/raw/master/mastodon.user.js
// @run-at          document-start
// @homepageURL     https://github.com/rexpan/chrome-snippet/blob/master/mastodon.user.js
// @supportURL      https://github.com/rexpan/chrome-snippet/issues
// @license         MIT
// ==/UserScript==

/**
 * https://developer.chrome.com/docs/extensions/mv3/match_patterns/
 * https://wiki.greasespot.net/Include_and_exclude_rules
 * https://wiki.greasespot.net/Metadata_Block#@run-at
 * https://wiki.greasespot.net/@grant
 */
(() => {'use strict';
    const myMastodon = 'fosstodon.org';
    const myElk      = `https://elk.zone/${myMastodon}`;

    /* Pages Elk cannot render, or that would break the login / resolve round trip */
    const instancePages  = /^\/(?:about|accounts|admin|api|auth|authorize_interaction|filters|interact|invites|media|media_proxy|oauth|privacy-policy|relationships|settings|share|statuses_cleanup|system|terms|users)(?:\/|$)/;
    /* Elk has these, but only ever for the instance I am signed in to */
    const localOnlyPages = /^\/(?:directory|explore|home|notifications|public|start)(?:\/|$)/;
    /* The tabs Elk mirrors on a profile; anything else after a handle is a post id */
    const profileTabs    = /^(?:followers|following|media|with_replies)$/;

    const go = url => { if (url !== location.href) location.replace(url); };

    /* /deck is the advanced UI, /embed the iframe view, both of the same content */
    const path  = location.pathname.replace(/^\/deck(?=\/|$)/, '').replace(/\/embed\/?$/, '');
    const parts = path.split('/').filter(Boolean);

    if (location.host === myMastodon) {
        if (!instancePages.test(path)) go(myElk + path + location.search + location.hash);
        return;
    }

    /* @user on this instance, or @user@origin for someone it federates with */
    const handle = parts[0]?.startsWith('@')
        ? (parts[0].slice(1).includes('@') ? parts[0] : `${parts[0]}@${location.host}`)
        : null;
    const isProfile = handle && (parts.length === 1 || (parts.length === 2 && profileTabs.test(parts[1])));

    if (isProfile) {
        /* The handle is globally unique, so Elk can resolve it without my instance */
        go([myElk, handle, ...parts.slice(1)].join('/'));
    } else if (parts[0] === 'tags' && parts.length === 2) {
        go(`${myElk}/tags/${parts[1]}`);
    } else if (instancePages.test(path) || localOnlyPages.test(path)) {
        /* Someone else's settings, timeline or about page: nothing for Elk to show */
    } else {
        /* A post, or another object id only its home instance can map onto my copy */
        const here = location.origin + path + location.search;
        go(`https://${myMastodon}/authorize_interaction?uri=${encodeURIComponent(here)}`);
    }
})();
