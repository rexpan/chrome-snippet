// ==UserScript==
// @name            weekly-vue.news-track-click
// @namespace       http://tampermonkey.net/
// @version         2023.05.26
// @description     weekly-vue.news/api/track-click
// @author          Rex Pan <napxer@gmail.com>
// @match           https://weekly-vue.news/api/track-click*
// @grant           none
// @updateURL       https://github.com/rexpan/chrome-snippet/raw/master/weekly-vue.news-track-click.user.js
// @downloadURL     https://github.com/rexpan/chrome-snippet/raw/master/weekly-vue.news-track-click.user.js
// @run-at          document-start
// @homepageURL     https://github.com/rexpan/chrome-snippet/blob/master/weekly-vue.news-track-click.user.js
// @supportURL      https://github.com/rexpan/chrome-snippet/issues
// @license         MIT
// ==/UserScript==

(function main() {'use strict';
    location.replace(new URL(location.href).searchParams.get('linkUrl'))
})();
