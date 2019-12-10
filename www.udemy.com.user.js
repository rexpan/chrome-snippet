// ==UserScript==
// @id              udemy
// @name            udemy auto add free
// @namespace       http://tampermonkey.net/
// @version         2019.12.10
// @description     auto open Udemy link
// @author          Rex Pan <napxer@gmail.com>
// @match           https://www.udemy.com/*
// @grant           window.close
// @updateURL       https://github.com/rexpan/chrome-snippet/raw/master/www.udemy.com.user.js
// @downloadURL     https://github.com/rexpan/chrome-snippet/raw/master/www.udemy.com.user.js
// @run-at          document-idle
// @priority        9001
// @homepageURL     https://github.com/rexpan/chrome-snippet/blob/master/www.udemy.com.user.js
// @supportURL      https://github.com/rexpan/chrome-snippet/issues
// @license         MIT
// ==/UserScript==

;(async () => { "use strict";

console.clear();

const buyBtnSelector = `button[data-purpose="buy-this-course-button"]`;
const a2cSelector = `button[data-purpose="add-to-cart"]`;
const oldPriceSelector = `.buy-box [data-purpose="course-old-price-text"]`;

const buyBtn = await querySelectorAsync(buyBtnSelector);
const text = buyBtn.innerText.trim().toLowerCase();
if (text == "go to course") {
    window.close();
    return;
}

if (document.querySelector(oldPriceSelector) == null) {
    window.close();
}

const a2cBtn = document.querySelector(a2cSelector);
if (a2cBtn.innerText.trim().toLowerCase() == "add to cart") {
    a2cBtn.click();
}

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
