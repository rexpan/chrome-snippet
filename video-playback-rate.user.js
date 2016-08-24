// ==UserScript==
// @id              video-playback-rate
// @name            Video playback rate
// @namespace       http://tampermonkey.net/
// @version         2019.6.18
// @description     Set playback-rate of video
// @author          Rex Pan <napxer@gmail.com>
// @match           http*://*/*
// @exclude         http*://*.nhaccuatui.com/*
// @exclude         http*://*.youtube.com/*
// @grant           none
// @updateURL       https://github.com/rexpan/chrome-snippet/raw/master/video-playback-rate.user.js
// @downloadURL     https://github.com/rexpan/chrome-snippet/raw/master/video-playback-rate.user.js
// @run-at          document-idle
// @priority        9001
// @homepageURL     https://github.com/rexpan/chrome-snippet/blob/master/video-playback-rate.user.js
// @supportURL      https://github.com/rexpan/chrome-snippet/issues
// @license         MIT
// ==/UserScript==

(() => {

  "use strict";

  const playbackRate = 2.0;
  const copyVideoSrcToClipboard = false;

  console.clear();

  document.addEventListener("play"   , (event) => { const video = event.target; setPlaybackRate(video); }, {capture:true, passive:true});
  document.addEventListener("playing", (event) => { const video = event.target; setPlaybackRate(video); }, {capture:true, passive:true, once:true});

  Array.from(document.querySelectorAll("video")).filter(v => !v.paused).forEach(setPlaybackRate);

  function setPlaybackRate(video) {
    console.log(video);
    video.playbackRate = playbackRate;
    if (copyVideoSrcToClipboard) try { copy(video.src); } catch(e) { }
  }
})();
