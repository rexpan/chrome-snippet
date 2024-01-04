// ==UserScript==
// @name            mastodon
// @namespace       http://tampermonkey.net/
// @version         2024.01.04
// @description     Google Play Store
// @author          Rex Pan <napxer@gmail.com>
// @match           https://indieweb.social/*
// @match           https://mastodon.online/*
// @match           https://fedi.simonwillison.net/*
// @match           https://mas.to/*
// @match           https://mastodon.social/*
// @match           https://fosstodon.org/*
// @grant           none
// @updateURL       https://github.com/rexpan/chrome-snippet/raw/master/mastodon.js
// @downloadURL     https://github.com/rexpan/chrome-snippet/raw/master/mastodon.js
// @run-at          document-start
// @homepageURL     https://github.com/rexpan/chrome-snippet/blob/master/mastodon.js
// @supportURL      https://github.com/rexpan/chrome-snippet/issues
// @license         MIT
// ==/UserScript==

/**
 * https://developer.chrome.com/docs/extensions/mv3/match_patterns/
 * https://wiki.greasespot.net/Include_and_exclude_rules
 * https://wiki.greasespot.net/Metadata_Block#@run-at
 * https://wiki.greasespot.net/@grant
 */
(async () => {'use strict';
    const myMastodon = 'https://fosstodon.org'
    const myElk = 'https://elk.zone/fosstodon.org'
    const parts = location.pathname.split('/');
    if (location.origin === myMastodon) {
        if (myElk) location.href = location.href.replace(myMastodon, myElk)
        return
    }
    if (parts.length === 2) {
        /* Profile */
        const [,user] = parts
        location.href = `${myMastodon}/${user}@${location.host}`;
    } else if (parts.length === 3) {
        /* Post */
        // https://indieweb.social/@addyosmani/109530799760434144 -> https://fosstodon.org/@addyosmani@indieweb.social/109530800084780894
        location.href = `${myMastodon}/authorize_interaction?uri=${location.href}`;

        const [,user,post] = parts
        const userAtHost = user.slice(1).includes('@') ? user : `${user}@${location.host}`
        //location.href = `${myMastodon}/${userAtHost}/${post}`;
    } else {
        location.href = `${myMastodon}/authorize_interaction?uri=${location.href}`;
    }
})();
