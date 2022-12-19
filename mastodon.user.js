// ==UserScript==
// @name            mastodon
// @namespace       http://tampermonkey.net/
// @version         2022.12.19
// @description     Google Play Store
// @author          Rex Pan <napxer@gmail.com>
// @match           https://indieweb.social/*
// @match           https://mastodon.online/*
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
    const parts = location.pathname.split('/');
    if (parts.length === 2) {
        /* Profile */
        const userName = parts[1];
        location.href = `${myMastodon}/${userName}@${location.host}`;
    } else {
    /* Post */
        // https://indieweb.social/@addyosmani/109530799760434144 -> https://fosstodon.org/@addyosmani@indieweb.social/109530800084780894
        location.href = `${myMastodon}/authorize_interaction?uri=${location.href}`;
    }
})();
