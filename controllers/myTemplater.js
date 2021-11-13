/* myTemplater.js Home made experimental templating */
"use strict";

const fs = require("fs");

exports.receipt = function(obj) {
    let html = `<!doctype html>
<html>
    <head>
        <meta charset="utf-8"/>
        <title>McKilroy's First Test Template</title>
    </head>
    <body>
        <h1>Kilroy's Receipt</h1>
        <div>
            <p>You entered the following</p>
            <h3>Subject</h3>
            <p>${obj.POST.subject}</p>

            <h3>Message</h3>
            <pre>${obj.POST.message}</pre>

            <h3>Name</h3>
            <p>${obj.POST.name}</p>

            <h3>Email</h3>
            <p>${obj.POST.email}</p>
        </div>
        <div>
            <h3>We noticed, and we will get back to you asap.</h3>
            <p><a href="/">Return to front page</a><p>
        </div>
    </body>
</html>`;
    return html;
};


exports.contacts = function(obj) {
    let htmltop = `<!doctype html>
<html>
    <head>
        <meta charset="utf-8"/>
        <title>McKilroy's Second Test Template</title>
        <link rel="stylesheet" href="side.css"/>
    </head>
    <body>
        <header>
            <h1>Kilroy's Contacts</h1>
            <nav>
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/side">Side</a></li>
                    <li><a href="/about">About</a></li>
                    <li><a href="/contact">Contact</a></li>
                    <li><a href="/contacts">List Contacts</a></li>
                </ul>
            </nav>
        </header>
        <div>`;

    let htmlbot = `        </div>
    </body>
</html>`;

    let dynamic = "<table>";

    for (let contact of obj) {
        dynamic += '<tr>';
        dynamic += `<td>${contact.name}</td>`;
        dynamic += `<td>${contact.email}</td>`;
        dynamic += `<td>${contact.phone}</td>`;
        dynamic += '</tr>';
    }
    dynamic += "</table>";


    return htmltop + dynamic + htmlbot;
};