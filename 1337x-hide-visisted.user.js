// ==UserScript==
// @id              1337x-hide-visisted
// @name            1337x-hide-visisted
// @namespace       http://tampermonkey.net/
// @version         2019.6.18
// @description     1337x-hide-visisted
// @author          Rex Pan <napxer@gmail.com>
// @match           https://1337x.to/sub/*/*/
// @grant           none
// @updateURL       https://github.com/rexpan/chrome-snippet/raw/master/1337x-hide-visisted.user.js
// @downloadURL     https://github.com/rexpan/chrome-snippet/raw/master/1337x-hide-visisted.user.js
// @run-at          document-idle
// @priority        9001
// @homepageURL     https://github.com/rexpan/chrome-snippet/blob/master/1337x-hide-visisted.user.js
// @supportURL      https://github.com/rexpan/chrome-snippet/issues
// @license         MIT
// ==/UserScript==

(() => {'use strict';

    const vs = JSON.parse(localStorage.getItem("visistedUrls") || "[]");
    const xs = [...document.querySelectorAll(`td.coll-1.name a+a`)];

    xs.filter(a => vs.includes(a.href))
        .forEach(a => a.parentElement.parentElement.hidden = true)
        ;
    localStorage.setItem("visistedUrls", JSON.stringify(xs.map(a => a.href)));

})();
