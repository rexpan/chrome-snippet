// ==UserScript==
// @id              open-techgearlab-new-article
// @name            open-techgearlab-new-article
// @namespace       http://tampermonkey.net/
// @version         2019.6.18
// @description     open-techgearlab-new-article
// @author          Rex Pan <napxer@gmail.com>
// @match           https://www.techgearlab.com/
// @grant           none
// @updateURL       https://github.com/rexpan/chrome-snippet/raw/master/open-techgearlab-new-article.user.js
// @downloadURL     https://github.com/rexpan/chrome-snippet/raw/master/open-techgearlab-new-article.user.js
// @run-at          document-idle
// @priority        9001
// @homepageURL     https://github.com/rexpan/chrome-snippet/blob/master/open-techgearlab-new-article.user.js
// @supportURL      https://github.com/rexpan/chrome-snippet/issues
// @license         MIT
// ==/UserScript==

(() => {'use strict';

const viewedUrls = JSON.parse(localStorage.getItem("viewedUrls") || "[]");
const set = new Set(viewedUrls);

const xs = [...document.querySelectorAll(`.tag_tile_card`)];
const ys = xs.map(card => card.querySelector("a[href]").href).filter(url => !set.has(url));
ys.forEach(y => {
    console.info(y);
    window.open(y)
});
if (ys.length > 0) localStorage.setItem("viewedUrls", JSON.stringify(ys.concat(viewedUrls).slice(0, 50)));
window.close();

})();
