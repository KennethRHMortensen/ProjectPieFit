/*
 *  https://stackoverflow.com/questions/29576768/using-node-js-client-sessions-without-express
 *  sessions native node
 */

var sessions = require("client-sessions");

var session = sessions({
  cookieName: 'mySession',
  secret: 'blargadeeblargblarg',
  duration: 24 * 60 * 60 * 1000,
  activeDuration: 1000 * 60 * 5
});

// then inside route handler..
session(req, res, function(){ console.log('done!'); });
