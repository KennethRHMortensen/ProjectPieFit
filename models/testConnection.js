'use strict';

let mysql = require('mysql');
let dbp = require('./dbParams.js');
var dbh = mysql.createConnection(dbp);

dbh.connect();

let sql = 'select * from task';
dbh.query(sql, function (err, rows) {
    if (err) throw err;
    let i = 0;
    while(i < rows.length) {
        let d = new Date(rows[i].entered);
        let s = `${d.getFullYear()}-${d.getMonth()+1}-${+d.getDate()}`;
        console.log(`${s}\t${rows[i].userid}\t${rows[i].task}`);
        i++;
    }
});

dbh.end();
