"use strict";
/*
 * models
 * handlers for data manipulation
 */
const maria = require("mariadb"); // file system access
const dbp = require("./dbParams.js");
const bcrypt = require("bcryptjs");

module.exports = {
  async updContacts(obj) {
    const dbh = await maria.createConnection(dbp);
    let hashed = await bcrypt.hash(obj.POST.password, 10);
    let sql = `insert into user values('${obj.POST.name}', '${obj.POST.email}', '${obj.POST.phone}', '${hashed}')`;
    await dbh.query(sql);
  },

  async createCard(obj) {
    const dbh = await maria.createConnection(dbp);
    // let data = obj.POST.exercise;
    // for (i = 0; i < array.length; i++) {};
    let sql = `insert into card values('${obj.POST.workouttype}', '${obj.POST.exercise}', '${obj.POST.reps}')`;
    await dbh.query(sql);
  },

  async showCards() {
    const dbh = await maria.createConnection(dbp);
    const rows = await dbh.query("select * from card");
    return rows;
  },

  async showContacts() {
    const dbh = await maria.createConnection(dbp);
    const rows = await dbh.query("select * from user");
    return rows;
  },

  async verify(obj) {
    const dbh = await maria.createConnection(dbp);
    let sql = `select name, usertype and password from user where email = '${obj.POST.email}'`;
    let rows = await dbh.query(sql);
    return rows;
  },
};
