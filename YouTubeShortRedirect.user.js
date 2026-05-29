// ==UserScript==
// @name            YouTubeShortRedirect
// @namespace       http://tampermonkey.net/
// @version         2026.07.07
// @description     Redirect YouTube Short
// @author          Rex Pan <napxer@gmail.com>
// @match           https://www.youtube.com/*
// @grant           none
// @updateURL       https://github.com/rexpan/chrome-snippet/raw/master/YouTubeShortRedirect.user.js
// @downloadURL     https://github.com/rexpan/chrome-snippet/raw/master/YouTubeShortRedirect.user.js
// @run-at          document-start
// @homepageURL     https://github.com/rexpan/chrome-snippet/blob/master/YouTubeShortRedirect.user.js
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
  redirect();

  window.addEventListener('yt-navigate-finish', redirect, true);
  window.addEventListener('popstate', redirect);

  function redirect() {
    const match = location.pathname.match(/^\/shorts\/([^/?#]+)/);
    if (match) location.replace('https://www.youtube.com/watch?v=' + match[1]);
  }
})();
