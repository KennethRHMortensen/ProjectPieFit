'use strict';
/*
 * models
 * handlers for data manipulation
 */
const maria = require("mariadb");                               // file system access
const httpStatus = require("http-status-codes");        // http sc
const experimental = require("../controllers/myTemplater"); // highly experimental template
const dbp = require('./dbParams.js');
const bcrypt = require('bcryptjs');

module.exports = {
    async updContacts(req, res, obj) {
        const dbh = await maria.createConnection(dbp);
        let hashed = await bcrypt.hash(obj.POST.password, 10);
        let sql = `insert into user values('${obj.POST.name}', '${obj.POST.email}', '${obj.POST.phone}', '${hashed}')`;
        await dbh.query(sql);
    },

    async showContacts (req, res) {
        const dbh = await maria.createConnection(dbp);
        const rows = await dbh.query('select * from user');
        return rows;
    },

    async verify(req, res, obj) {
        const dbh = await maria.createConnection(dbp);
        let sql = `select password from user where email = '${obj.POST.email}'`;
        let rows = await dbh.query(sql);
        return rows;
    }
}