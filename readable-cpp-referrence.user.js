// ==UserScript==
// @name         Readable C++ Referrence
// @version      0.2
// @namespace    http://tampermonkey.net/
// @version      2024-05-07
// @description  Readable C++ Referrence!
// @author       LinHeLurking
// @match        https://en.cppreference.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=cppreference.com
// @require      https://cdn.bootcdn.net/ajax/libs/jquery/3.4.0/jquery.min.js
// @grant        GM_addStyle
// ==/UserScript==

/* global $ */

(function() {
    'use strict';

    // Your code here...
    const body_content = $("#bodyContent");
    const old_body_size = body_content.css("font-size");
    // Navigation bar inherits body content
    $(".t-navbar").css("font-size", old_body_size);
    body_content.css("font-size", "16px");
    $("div.mw-geshi").css("width", "47em");
    $("pre").css("width", "47em");
    // Table of content
    const toc = [];
    $(".mw-headline").each((i, obj) => {
        toc.push(obj.innerText);
    });
    // console.log(toc);
    let toc_html = $("<div class='generated-toc'></div>");
    toc.forEach((item, i) => {
        const head = document.createElement("div");
        const anchor = item.replace(" ", "_");
        head.innerHTML = `<a href="#${anchor}">${item}</a>`;
        if(i == 0) {
            head.style.marginTop = "10px";
        }
        if(i == toc.length - 1) {
            head.style.marginBottom = "10px";
        }
        toc_html.append(head);
    });
    $("#cpp-content-base").append(toc_html);
    $("div.generated-toc > div").css("margin-left", "15px");
    $("div.generated-toc > div").css("margin-right", "15px");
    toc_html = $("div.generated-toc");
    toc_html.css("position", "fixed");
    toc_html.css("left", "20px");
    toc_html.css("border-style", "double");
    const toc_top = 100;
    toc_html.css("top", `${toc_top}px`);
    onscroll = (event) => {};
    addEventListener("scroll", (event) => {
        if(window.scrollY > toc_top) {
            toc_html.css("position", "fixed");
            toc_html.css("top", "20px");
        } else {
            toc_html.css("position", "fixed");
            toc_html.css("top", `${toc_top}px`);
        }
    });
    // Hide toc for narrow window
    $("style").text("@media screen and (max-width: 1200px) { div.generated-toc { display: none; } }");
})();
