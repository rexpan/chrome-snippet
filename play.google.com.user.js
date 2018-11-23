// ==UserScript==
// @id              google-play-store
// @name            google-play-store
// @namespace       http://tampermonkey.net/
// @version         2019.6.18
// @description     Google Play Store
// @author          Rex Pan <napxer@gmail.com>
// @match           https://play.google.com/store/*
// @grant           none
// @updateURL       https://github.com/rexpan/chrome-snippet/raw/master/play.google.com.user.js
// @downloadURL     https://github.com/rexpan/chrome-snippet/raw/master/play.google.com.user.js
// @run-at          document-idle
// @priority        9001
// @homepageURL     https://github.com/rexpan/chrome-snippet/blob/master/play.google.com.user.js
// @supportURL      https://github.com/rexpan/chrome-snippet/issues
// @license         MIT
// ==/UserScript==

(async () => {'use strict';

    if (location.pathname.includes("/books/collection/")) {
        setInterval(() => {
            window.scrollTo(0, document.body.scrollHeight);
            hideBooks();
        }, 2000);
    }

    if (location.pathname.includes("/apps/collection/")) {
        setInterval(() => {
            window.scrollTo(0, document.body.scrollHeight);
            hideApps();
        }, 2000);
    }

    if (location.pathname.includes("/apps/details")) {
        const installedButton = Array.from(document.querySelectorAll(`button`)).find(button => button.innerText === "Installed");
        if (installedButton != null) window.close();
    }

    function hideBooks(){
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

        window.scrollTo(0, document.body.scrollHeight);
    }

    function sleep(n) {
        return new Promise(resolve => setTimeout(resolve, n))
    }
})();
