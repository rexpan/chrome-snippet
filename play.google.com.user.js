// ==UserScript==
// @name            google-play-store
// @namespace       http://tampermonkey.net/
// @version         2022.06.21
// @description     Google Play Store
// @author          Rex Pan <napxer@gmail.com>
// @match           https://play.google.com/store/*
// @grant           none
// @updateURL       https://github.com/rexpan/chrome-snippet/raw/master/play.google.com.user.js
// @downloadURL     https://github.com/rexpan/chrome-snippet/raw/master/play.google.com.user.js
// @run-at          document-idle
// @homepageURL     https://github.com/rexpan/chrome-snippet/blob/master/play.google.com.user.js
// @supportURL      https://github.com/rexpan/chrome-snippet/issues
// @license         MIT
// ==/UserScript==

(async () => {'use strict';
    function r() { hideCards(); setTimeout(r, 2000) } r();

    function hideCards(){
        if (location.pathname == "/store/apps/details" && Array.from(document.querySelectorAll(`button span`)).some(s => s.textContent == 'Install on more devices')) { window.close(); return; }

        if (!location.pathname.includes("/store/books/collection/") && location.pathname != "/store/books") return;
        Array.from(document.querySelectorAll(`button[data-item-id]`))
            .filter(b => b.innerText == "Free")
            .map(b => b.closest(`c-wiz`))
            .filter(Boolean)
            .forEach(card => { card.hidden = true });

        Array.from(document.querySelectorAll(`button[data-item-id]`))
            .filter(b => !b.innerText.includes("Free") && !(/₫0$/.test(b.innerText)))
            .map(b => b.closest(`c-wiz`))
            .filter(Boolean)
            .forEach(card => { card.hidden = true; card.style.opacity = 0.2 });

        Array.from(document.querySelectorAll(`div[role='listitem']`)).filter(d => d.querySelector(`span[aria-label*='now reduced to Free']`) == null).forEach(d => d.hidden = true);

        if (false)
        Array.from(document.querySelectorAll(`c-wiz`))
            .filter(card => card.querySelector(`button`) == null)
            .forEach(card => { card.hidden = true });
        window.scrollTo(0, document.body.scrollHeight);
    }

    function hideBooks() {
        const bs = document.querySelectorAll(`.card.books[data-docid]`);
        for(let b of bs) {
           const fp = b.querySelector(`span.full-price`);
           const dp = b.querySelector(`span.display-price`);
           const aq = b.querySelector(`span.acquired-icon`);

           if (fp != null) console.log(fp.innerText, dp.innerText);
           b.style.display = (fp == null || aq != null) ? "none" : "";
           b.style.opacity = dp.innerText != "Free" ? 0.2 : 1;
        }
    }

    function hideApps() {
        // https://play.google.com/store/apps/collection/recommended_for_you_HOME_PREMIUM_GAME?clp=ygIICgRHQU1FEA0%3D:S:ANO1ljL1D5I

        const bs = document.querySelectorAll(`.card.apps[data-docid]`);
        for(let b of bs) {
           const fp = b.querySelector(`span.full-price`);
           const aq = b.querySelector(`span.acquired-icon`);
           console.log(fp);
           b.style.display = (fp == null || aq != null) ? "none" : "";
        }
    }

    function sleep(n) {
        return new Promise(resolve => setTimeout(resolve, n))
    }
})();
