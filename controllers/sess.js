/*
 *  https://stackoverflow.com/questions/29576768/using-node-js-client-sessions-without-express
 *  sessions native node
 */

var sessions = require("client-sessions");

var session = sessions({
    cookieName: 'mySession',           // cookie name dictates the key name added to the request object
    secret: 'blargadeeblargblarg',     // should be a large unguessable string
    duration: 24 * 60 * 60 * 1000,     // how long the session will stay valid in ms
    activeDuration: 1000 * 60 * 5      // if expiresIn < activeDuration, the session will be extended by activeDuration milliseconds
});

// then inside route handler..
session(req, res, function(){ console.log('done!'); });
