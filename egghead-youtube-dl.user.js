// ==UserScript==
// @id              egghead-youtube-dl
// @name            egghead.io youtube-dl download
// @namespace       http://tampermonkey.net/
// @version         2019.6.18
// @description     generate list of youtube-dl commands to download egghead.io course
// @author          Rex Pan <napxer@gmail.com>
// @match           https://egghead.io/*
// @grant           none
// @updateURL       https://github.com/rexpan/chrome-snippet/raw/master/egghead-youtube-dl.user.js
// @downloadURL     https://github.com/rexpan/chrome-snippet/raw/master/egghead-youtube-dl.user.js
// @run-at          document-idle
// @priority        9001
// @homepageURL     https://github.com/rexpan/chrome-snippet/blob/master/egghead-youtube-dl.user.js
// @supportURL      https://github.com/rexpan/chrome-snippet/issues
// @license         MIT
// ==/UserScript==

;(async () => { "use strict";
console.clear();

if (location.pathname.startsWith("/courses/")) {
    const lessonSelector = `.b--gray-secondary a.w-100.no-underline[href^="/lessons/"]`;
    await waitSelector(lessonSelector);

    const command = (
        Array.from(document.querySelectorAll(lessonSelector))
        .map(a => ({href:a.href, text:a.text}))
        .map(({text, href}, i) => youtubeDlCommand(i, text, href))
        .join("")
    );
    insertText(command);
    const pre = document.createElement("pre");
    pre.innerHTML = "\n\n\n\n\n\n\n\n"+command+"\n\n";
    document.body.prepend(pre);
}

if (location.pathname.startsWith("/playlists/")) {
    const lessonSelector = `a[href^="/lessons/"]`;
    await waitSelector(lessonSelector);

    const command = (
        Array.from(document.querySelectorAll(lessonSelector))
        .filter(a => !!a.text && a.text != "Watch Playlist")
        .map(a => ({href:a.href, text:a.text}))
        .map(({text, href}, i) => youtubeDlCommand(i, text, href))
        .join("")
    );
    insertText(command);
}

async function waitSelector(selector){
    while (document.querySelector(selector) == null) await sleep(300);
}

function youtubeDlCommand(i, text, href) {
    return `youtube-dl -o "${String(i+1).padStart(2, "0")} ${text.replace(/[/\\?%*:|"<>]/g, '_')}.%(ext)s" ${href}\n`;
}

function insertText(text) {
    const pre = document.createElement("pre");
    pre.innerHTML = `\n\n\n\n\n\n\n\n${text}\n\n`;
    document.body.prepend(pre);
}

function sleep(n, v) {
    return new Promise(resolve => setTimeout(resolve, n, v))
}

})();
