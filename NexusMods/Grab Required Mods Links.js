// ==UserScript==
// @name         Grab Mods Requiring Links
// @namespace    http://tampermonkey.net/
// @version      2024-03-27
// @description  Copies 'mods requiring this mod' links to clipboard, you can then keep them or open them using multiple url openers, your choice. I won't add that feature to make this lightweight.
// @author       TragicNet
// @include      /^https:\/\/www\.nexusmods\.com\/.*\/mods\/(?!$)\d+$/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=nexusmods.com
// @grant       GM_addStyle
// ==/UserScript==

function grabLinks(reqBlock) {
    let rows = reqBlock.querySelectorAll('.table > tbody:nth-child(2) > tr');
    let links = [];
    rows.forEach((row) => {
        links.push(row.querySelector('td:nth-child(1) > a:nth-child(1)').href);
    });
    navigator.clipboard.writeText(links.join('\n'));
    alert("Copied the links to clipboard");
}

GM_addStyle(`
#grabLinkBtn {
    float: right;
}
`);

window.addEventListener('load', (event) => {
    let button = document.createElement('button');
    button.setAttribute('id', 'grabLinkBtn');
    button.innerHTML = 'Grab Links';
    button.className = 'btn';
    let reqBlock = document.querySelector('dd.clearfix:nth-child(2) > div:nth-child(2)');
    button.addEventListener (
        "click", () => grabLinks(reqBlock), false
    );
    reqBlock.insertBefore(button, reqBlock.firstChild);
});
