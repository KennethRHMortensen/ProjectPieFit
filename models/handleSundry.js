'use strict';
/*
 * models
 * handlers for data manipulation
 */
const maria = require("mariadb");                               // file system access
const dbp = require('./dbParams.js');
const bcrypt = require('bcryptjs');

module.exports = {
    async updUsers(obj) {
        const dbh = await maria.createConnection(dbp);
        let hashed = await bcrypt.hash(obj.POST.password, 10);
        let sql = `insert into user values('${obj.POST.name}', '${obj.POST.email}', '${obj.POST.phone}', '${hashed}')`;
        await dbh.query(sql);
    },

    async updCards(obj) {
        const dbh = await maria.createConnection(dbp);
        let sql = `insert into card values('${obj.POST.workouttype}', '${obj.POST.exercise}', '${obj.POST.reps}')`;
        await dbh.query(sql);
    },
    async updDrafts(obj) {
        const dbh = await maria.createConnection(dbp);
        let sql = `insert into draft values('${obj.POST.workouttype}', '${obj.POST.exercise}', '${obj.POST.reps}')`;
        await dbh.query(sql);
    },
    async updCardsFromDrafts(obj) {
        const dbh = await maria.createConnection(dbp);
        let sql = `INSERT INTO card
        SELECT * FROM draft;`;
        function truncateTable() {
            let sql = `TRUNCATE TABLE draft;`
            dbh.query(sql);
        }
        await dbh.query(sql);
        truncateTable();
    },
    
    async showUsers () {
        const dbh = await maria.createConnection(dbp);
        const rows = await dbh.query('select * from user');
        return rows;
    },

    async showCards () {
        const dbh = await maria.createConnection(dbp);
        const rows = await dbh.query('select * from card');
        return rows;
    },
    async showDrafts () {
        const dbh = await maria.createConnection(dbp);
        const rows = await dbh.query('select * from draft');
        return rows;
    },


    async verify(obj) {
        const dbh = await maria.createConnection(dbp);
        let sql = `select name, password from user where email = '${obj.POST.email}'`;
        let rows = await dbh.query(sql);
        return rows;
    }
}