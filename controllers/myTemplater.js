/* myTemplater.js Home made experimental templating */
"use strict";
const regex = /\<42 contacts 24\>/g;

exports.data2html = function(data, obj) {
    let s = `<table>`;
    for (let c of obj.contacts) {
        s += `<tr><td>${c.name}</td><td>${c.email}</td><td>${c.phone}</td></tr>`
    }
    s += `</table>`
    data = '' + data;
    return data.replaceAll(regex, s);
};