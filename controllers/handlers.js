'use strict';
/*
 * handlers.js
 * Requesthandlers to be called by the router mechanism
 */
const bcrypt = require('bcryptjs');                         // hashing sw
const fs = require("fs");                                   // file system access
const httpStatus = require("http-status-codes");            // http sc

const cook = require("../controllers/sess");                // session cookies
const lib = require("../controllers/libWebUtil");           // home grown utilities
const nmlPlate = require("../controllers/myTemplater");     // home grown templater
const models = require("../models/handleSundry");           // models are datahandlers

const isLoggedIn = async function (req, res) {
    let session = cook.cookieObj(req, res);                 // create session object
    let chk = session.get('login', { signed: true });
    return chk == undefined ? false : true; 
};

const getAndServe = async function (res, path, contentType) {   // asynchronous
    let obj;
    let args = [...arguments];                              // arguments to array
    let myargs = args.slice(3);                             // dump first three
    await fs.readFile(path, function(err, data) {           // awaits async read
        if (err) {
            console.log(`Not found file: ${path}`);
        } else {
            res.writeHead(httpStatus.OK, {                  // yes, write header
                "Content-Type": contentType
            });
            
            while( typeof (obj = myargs.shift()) !== 'undefined' ) {
                if (path === 'views/displayUsers.html') {
                    
                    data = nmlPlate.doTheMagicUser(data, obj)
                } else {
                    
                    data = nmlPlate.doTheMagic(data, obj)
                }       // inject var data to html
            }
                                                            // call templater
            /*while( typeof (obj = myargs.shift()) !== 'undefined' ) {
                data = nmlPlate.doTheMagic(data, obj)       // inject var data to html
            }*/
            

            res.write(data);
            res.end();
        }
    });
};

module.exports = {
    login(req, res) {
        let path = "views/login.html";
        let content = "text/html; charset=utf-8";
        getAndServe(res, path, content, {msg: 'Login required'});
    },
    async home(req, res) {                   
        let session = cook.cookieObj(req, res);    // create session object
        let chk = session.get('login', { signed: true });                   
        let path = "views/index.html";
        let content = "text/html; charset=utf-8";
        getAndServe(res, path, content, {welcome: chk});
    },    
    signup(req, res) {
        let path = "views" + req.url + ".html";
        let content = "text/html; charset=utf-8";
        getAndServe(res, path, content);
    },
    async other(req, res) {
        if (! await isLoggedIn(req, res)) {
            req.url = '/login'
            module.exports.login(req, res)
        }        
        let path = "views" + req.url + ".html";
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
    svg(req, res) {
        let path = "public" + req.url;
        let content = "image/svg+xml";
        getAndServe(res, path, content);
    },
    ico(req, res) {
        let path ="public" + req.url;
        let content = "image/x-icon";
        getAndServe(res, path, content);
    },

    notfound(req, res) {
        console.log(`Handler 'notfound' was called for route ${req.url}`);
        res.end();
    },

    async users(req, res) {
        if (! await isLoggedIn(req, res)) {
            req.url = '/login'
            module.exports.login(req, res)
        }
        let r = await models.showUsers(req, res);
        let content = "text/html; charset=utf-8";
        let path = "views/displayUsers.html";
        getAndServe(res, path, content, {contacts: r, a: 'right aside', b: 'left aside'}); // extra arg for templater
    },

    async cards(req, res) {
        if (! await isLoggedIn(req, res)) {
            req.url = '/login'
            module.exports.login(req, res)
        }
        let r = await models.showCards(req, res);
        let content = "text/html; charset=utf-8";
        let path = "views/displayCards.html";
        getAndServe(res, path, content, {contacts: r, a: 'right aside', b: 'left aside'}); // extra arg for templater
    },

    async drafts(req, res) {
        if (! await isLoggedIn(req, res)) {
            req.url = '/login'
            module.exports.login(req, res)
        }
        let r = await models.showDrafts(req, res);
        let content = "text/html; charset=utf-8";
        let path = "views/displayDrafts.html";
        getAndServe(res, path, content, {contacts: r, a: 'right aside', b: 'left aside'}); // extra arg for templater
    },

    async receiveUsers(req, res, data) {        
        let obj = lib.makeWebArrays(req, data);         // home made GET and POST objects
        await models.updUsers(obj);
        req.url = "/";                                  // repoint req
        module.exports.login(req, res);                  // go to home page
    },
    async receiveCard(req, res, data) {        
        let obj = lib.makeWebArrays(req, data);         // home made GET and POST objects
        await models.updCardsFromDrafts(obj);
        req.url = "/";                                  // repoint req
        module.exports.home(req, res);                  // go to home page
    },
    async receiveDraft(req, res, data) {        
        let obj = lib.makeWebArrays(req, data);         // home made GET and POST objects
        await models.updDrafts(obj);
        req.url = "/";                                  // repoint req
        module.exports.home(req, res);                  // go to home page
    },

    async verifyLogin (req, res, data) {
        let session = cook.cookieObj(req, res);         // create session object
        let obj = lib.makeWebArrays(req, data);         // home made GET and POST objects
        let r = await models.verify(obj);
        if (r.length == 1 && await bcrypt.compare(obj.POST.password, ''+r[0].password)) {
            let name = '' + r[0].name;
            session.set('login', name, { signed: true });       // set login cookie
            req.url = "/";                                      // repoint req
            module.exports.home(req, res);                      // go to home page
        } else {
            module.exports.logout(req, res);                    // unset login cookie
        }
    },

    async logout (req, res) {
        let session = cook.cookieObj(req, res);                 // create session object
        session.set('login', { signed: true });                 // unset login cookie
        req.url = "/login";                                     // repoint req
        module.exports.login(req, res);                         // go to login page
    }
}