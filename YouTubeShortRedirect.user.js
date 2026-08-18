// ==UserScript==
// @name            YouTubeShortRedirect
// @namespace       http://tampermonkey.net/
// @version         2026.08.18
// @description     Redirect YouTube Short, and force 2x playback rate
// @author          Rex Pan <napxer@gmail.com>
// @match           https://www.youtube.com/*
// @grant           none
// @updateURL       https://github.com/rexpan/chrome-snippet/raw/master/YouTubeShortRedirect.user.js
// @downloadURL     https://github.com/rexpan/chrome-snippet/raw/master/YouTubeShortRedirect.user.js
// @run-at          document-start
// @homepageURL     https://github.com/rexpan/chrome-snippet/blob/master/YouTubeShortRedirect.user.js
// @supportURL      https://github.com/rexpan/chrome-snippet/issues
// @license         MIT
// ==/UserScript==

/**
 * https://developer.chrome.com/docs/extensions/mv3/match_patterns/
 * https://wiki.greasespot.net/Include_and_exclude_rules
 * https://wiki.greasespot.net/Metadata_Block#@run-at
 * https://wiki.greasespot.net/@grant
 */
(() => {'use strict';
  const playbackRate = 2;

  rememberPlaybackRate();
  redirect();
  setPlaybackRate();

  window.addEventListener('yt-navigate-finish', () => { redirect(); setPlaybackRate(); }, true);
  window.addEventListener('yt-player-updated', setPlaybackRate, true);
  document.addEventListener('playing', setPlaybackRate, {capture:true, passive:true});
  window.addEventListener('popstate', redirect);

  function redirect() {
    const match = location.pathname.match(/^\/shorts\/([^/?#]+)/);
    if (match) location.replace('https://www.youtube.com/watch?v=' + match[1]);
  }

  /**
   * The player element is its own API surface: YouTube mixes the same methods the
   * IFrame API documents (setPlaybackRate / getPlaybackRate / getAvailablePlaybackRates)
   * into #movie_player, so the speed change goes through the player's own state and the
   * settings menu shows it. Assigning video.playbackRate skips that and leaves the UI stale.
   */
  function setPlaybackRate() {
    const player = document.getElementById('movie_player') || document.getElementById('shorts-player');
    if (!player || typeof player.setPlaybackRate !== 'function') return;

    const rates = player.getAvailablePlaybackRates?.();
    if (rates && !rates.includes(playbackRate)) return;
    if (player.getPlaybackRate?.() === playbackRate) return;

    player.setPlaybackRate(playbackRate);
  }

  /**
   * Same localStorage entry the settings menu writes when you pick a speed by hand, so a
   * freshly created player starts at 2x on its own instead of being corrected afterwards.
   */
  function rememberPlaybackRate() {
    const now = Date.now();
    try {
      localStorage.setItem('yt-player-playback-rate', JSON.stringify({
        data       : String(playbackRate),
        expiration : now + 30 * 24 * 60 * 60 * 1000,
        creation   : now,
      }));
    } catch (e) { }
  }
})();
