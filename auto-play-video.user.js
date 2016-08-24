// ==UserScript==
// @id              feedly-autoplay-video
// @name            Feedly autoplay video
// @namespace       http://tampermonkey.net/
// @version         2019.6.18
// @description     Autoplay video in Feedly
// @author          Rex Pan <napxer@gmail.com>
// @match           https://feedly.com/*
// @grant           none
// @updateURL       https://github.com/rexpan/chrome-snippet/raw/master/auto-play-video.user.js
// @downloadURL     https://github.com/rexpan/chrome-snippet/raw/master/auto-play-video.user.js
// @run-at          document-idle
// @priority        9001
// @homepageURL     https://github.com/rexpan/chrome-snippet/master/auto-play-video.user.js
// @supportURL      https://github.com/rexpan/chrome-snippet/issues
// @license         MIT
// ==/UserScript==

(() => {'use strict';

const playbackRate = 1.5;
const fraction = 0.0;

const observedVideos = new Set();
const options = {
  root: null,//document.querySelector('body'),
  rootMargin: '0px',
  threshold: [0, 0.5, 1],
};

const io = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => entry.target.pause());

    const entry = entries.find(e => e.intersectionRatio > 0.5);
    if (entry == null) return;
    const video = entry.target;
    video.playbackRate = playbackRate;
    video.muted = false;
    video.play();
}, options);
observeVideos();

function observeVideos(){
    document.querySelectorAll("video").forEach(v => {
        if (observedVideos.has(v)) return;
        observedVideos.add(v);
        io.observe(v);
        console.log(v);
    });
}

var mo = new MutationObserver((mutations) => {
    console.table(mutations); console.log(mutations);
    if (mutations.every(m => m.addedNodes.legth < 1)) return;
    observeVideos();
});
mo.observe(document, { childList: true, subtree:true, });

})();
