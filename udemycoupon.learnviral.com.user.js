// ==UserScript==
// @id              udemycoupon.learnviral.com
// @name            udemycoupon.learnviral.com auto open
// @namespace       http://tampermonkey.net/
// @version         2019.6.18
// @description     auto open Udemy link
// @author          Rex Pan <napxer@gmail.com>
// @match           https://udemycoupon.learnviral.com/coupon/*
// @grant           none
// @updateURL       https://github.com/rexpan/chrome-snippet/raw/master/udemycoupon.learnviral.com.user.js
// @downloadURL     https://github.com/rexpan/chrome-snippet/raw/master/udemycoupon.learnviral.com.user.js
// @run-at          document-idle
// @priority        9001
// @homepageURL     https://github.com/rexpan/chrome-snippet/blob/master/udemycoupon.learnviral.com.user.js
// @supportURL      https://github.com/rexpan/chrome-snippet/issues
// @license         MIT
// ==/UserScript==

;(async () => { "use strict";

console.clear();
const linkSelector = `a.coupon-code-link`;
debugger;

const link = await querySelectorAsync(linkSelector);
const { href } = link;
const url = new URL(href);
if (!url.search) {
    window.close();
    return;
}

location.href = link.href;

async function querySelectorAsync(selector) {
    let element;
    while (element == null) {
        await sleep(300);
        element = document.querySelector(selector);
    }
    return element;
}

function sleep(n, v) {
    return new Promise(resolve => setTimeout(resolve, n, v))
}

})();
