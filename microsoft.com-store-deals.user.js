// ==UserScript==
// @id              microsoft.com-store-deals
// @name            Microsoft Store Deals
// @namespace       http://tampermonkey.net/
// @version         2019.6.18
// @description     hide none free deals
// @author          Rex Pan <napxer@gmail.com>
// @match           https://www.microsoft.com/en-us/store/deals/*
// @grant           none
// @updateURL       https://github.com/rexpan/chrome-snippet/raw/master/microsoft.com-store-deals.user.js
// @downloadURL     https://github.com/rexpan/chrome-snippet/raw/master/microsoft.com-store-deals.user.js
// @run-at          document-idle
// @priority        9001
// @homepageURL     https://github.com/rexpan/chrome-snippet/blob/master/microsoft.com-store-deals.user.js
// @supportURL      https://github.com/rexpan/chrome-snippet/issues
// @license         MIT
// ==/UserScript==

;(async () => { "use strict";

// https://www.microsoft.com/en-us/store/deals/games/xbox
// https://www.microsoft.com/en-us/store/deals/games/pc
// https://www.microsoft.com/en-us/store/deals/apps/pc

console.clear();

document.querySelectorAll(`[itemprop="price"][content^="$"]`)
.forEach(span => span.closest(".m-channel-placement-item").hidden = true);

})();
