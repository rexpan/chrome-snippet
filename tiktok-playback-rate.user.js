// ==UserScript==
// @id              tiktok-playback-rate
// @name            tiktok playback rate
// @namespace       http://tampermonkey.net/
// @version         2026.7.7
// @description     Set playback-rate of video
// @author          Rex Pan <napxer@gmail.com>
// @match           https://www.tiktok.com/*
// @grant           none
// @updateURL       https://github.com/rexpan/chrome-snippet/raw/master/tiktok-playback-rate.user.js
// @downloadURL     https://github.com/rexpan/chrome-snippet/raw/master/tiktok-playback-rate.user.js
// @run-at          document-idle
// @priority        9001
// @homepageURL     https://github.com/rexpan/chrome-snippet/blob/master/tiktok-playback-rate.user.js
// @supportURL      https://github.com/rexpan/chrome-snippet/issues
// @license         MIT
// ==/UserScript==

(() => {

  "use strict";

  const playbackRate = 1.75;
  const copyVideoSrcToClipboard = false;

  document.addEventListener("play"   , (event) => setPlaybackRate(event.target), {capture:true, passive:true});
  document.addEventListener("playing", (event) => setPlaybackRate(event.target), {capture:true, passive:true});

  document.querySelectorAll("video").forEach(setPlaybackRate);

  function setPlaybackRate(video) {
    if (!(video instanceof HTMLVideoElement)) return;
    video.playbackRate = playbackRate;
    if (copyVideoSrcToClipboard) {
      navigator.clipboard?.writeText(video.src).catch(() => {});
    }
  }
})();
