// ==UserScript==
// @id              udemy
// @name            udemy auto add free
// @namespace       http://tampermonkey.net/
// @version         2020.02.26
// @description     auto open Udemy link
// @author          Rex Pan <napxer@gmail.com>
// @match           https://www.udemy.com/course/*
// @grant           window.close
// @updateURL       https://github.com/rexpan/chrome-snippet/raw/master/www.udemy.com.user.js
// @downloadURL     https://github.com/rexpan/chrome-snippet/raw/master/www.udemy.com.user.js
// @run-at          document-idle
// @priority        9001
// @homepageURL     https://github.com/rexpan/chrome-snippet/blob/master/www.udemy.com.user.js
// @supportURL      https://github.com/rexpan/chrome-snippet/issues
// @license         MIT
// ==/UserScript==

;(() => { "use strict";

console.clear();

if (!location.search.includes("couponCode=")) {
    debugger;
    window.close();
}

(async () => {
    const buyBtn = await querySelectorAsync(`button[data-purpose="buy-this-course-button"]`);
    if (isPurchased(buyBtn)) {
        debugger;
        window.close();
    }
    if (document.querySelector(`.buy-box [data-purpose="course-old-price-text"]`) == null) {
        window.close();
    }

    const addToCartBtn = document.querySelector(`.buy-box__element.buy-box__element--add-to-cart-button`);
    if (addToCartBtn.innerText.trim().toLowerCase() == "add to cart") {
        addToCartBtn.click();
    }
})();

(async () => {
    const buyBtn = await querySelectorAsync(`[data-purpose="purchase-section"] .buy-box__element--buy-button`);
    if (isPurchased(buyBtn)) {
        debugger;
        window.close();
    }

    const priceTag = await querySelectorAsync(`[data-purpose="purchase-section"] [data-purpose="course-price-text"]`);
    removeScreenReader();
    const price = priceTag.innerText.trim().toLowerCase();
    if (price != "free") {
        if (price.includes("$")) window.close();
        else { debugger; return; }
    }

    const addToCartBtn = document.querySelector(`[data-purpose="purchase-section"] .buy-box__element--add-to-cart-button button`);
    if (addToCartBtn == null) debugger;
    else addToCartBtn.click();
})();

function isPurchased(buyBtn) {
    const text = buyBtn.innerText.trim().toLowerCase();
    return (text == "go to course");
}

function removeScreenReader() {
    const xs = document.querySelectorAll(`.udlite-sr-only`);
    for (const x of xs) x.remove();
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
