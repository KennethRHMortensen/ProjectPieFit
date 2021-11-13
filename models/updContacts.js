'use strict';
/*
 * models.js
 * Special handlers for data manipulation
 */
const fs = require("fs");                               // file system access
const httpStatus = require("http-status-codes");        // http sc
const FILENAME = __dirname + '/../data/contacts.json';
const experimental = require("../controllers/myTemplater"); // highly experimental template
const uc = require('./User');
const User = uc.User;

module.exports = {
    async updContacts(req, res, obj) {
        await fs.readFile(FILENAME, 'utf-8', function (err, data) {
            if (err) {
                console.log("Error loading file");
            } else {
                let users = [];
                if (data.length !== 0)
                    users = JSON.parse(data);
                let now = new Date();
                let user = new User(
                    obj.POST.name,
                    obj.POST.email,
                    obj.POST.phone,
                    now.toISOString()
                );
                users.push(user);

                //var json = JSON.stringify(obj);

                fs.writeFile(FILENAME, JSON.stringify(users), 'utf-8', function(err) {
                    if(err)
                        throw err;
                });
            }
        });
    },

    showContacts (req, res) {
        fs.readFile(FILENAME, 'utf-8', function (err, fdata){
            if (err) {
                console.log("Error loading file");
            } else {
                let data = JSON.parse(fdata);
                res.writeHead(httpStatus.OK, {                  // yes, write relevant header
                    "Content-Type": "text/html; charset=utf-8"
                });
                res.write(experimental.contacts(data));
                res.end();
            }
        });
    }
}