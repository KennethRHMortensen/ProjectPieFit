'use strict';
/*
 * handlers.js
 * Requesthandlers to be called by the router mechanism
 */
const fs = require("fs");                                   // file system access
const httpStatus = require("http-status-codes");            // http sc
const lib = require("../controllers/libWebUtil");           // home grown utilities
const models = require("../models/updContacts");            // models are datahandlers

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
const getAndServe = async function (res, path, content) {   // asynchronous
    await fs.readFile(path, function(err, data) {           // awaits async read
        if (err) {
            console.log(`Not found file: ${path}`);
        } else {
            res.writeHead(httpStatus.OK, {                  // yes, write header
                "Content-Type": content
            });
            res.write(data);
            res.end();
        }
    });
};

module.exports = {
    home(req, res) {
        let path = req.url;
        if (path === "/") {
            path = "/index";
        }
        path = "views" + path + ".html";
        let content = "text/html; charset=utf-8";
        getAndServe(res, path, content);
    },
    js(req, res) {
        let path = "public/javascripts" + req.url;
        let content = "application/javascript; charset=utf-8";
        getAndServe(res, path, content);
    },
    css(req, res) {
        let path = "public/stylesheets" + req.url;
        let content = "text/css; charset=utf-8";
        getAndServe(res, path, content);
    },
    png(req, res) {
        let path = "public/images" + req.url;
        let content = "image/png";
        getAndServe(res, path, content);
    },
    ico(req, res) {
        let path = "public" + req.url;
        let content = "image/x-icon";
        getAndServe(res, path, content);
    },

    notfound(req, res) {
        console.log(`Handler 'notfound' was called for route ${req.url}`);
        res.end();
    },

    contacts(req, res) {
        models.showContacts(req, res);
    },

    async receiveContacts(req, res, data) {
        let obj = lib.makeWebArrays(req, data);         // home made GET and POST objects
        await models.updContacts(req, res, obj);
        res.writeHead(httpStatus.MOVED_PERMANENTLY, {"Location": "http://localhost:3000"});
        res.end();
    }
}
