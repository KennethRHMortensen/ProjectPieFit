/*
 * Cookie code
 */
const Cookie = require('cookies');

// Optionally define keys to sign cookie values to prevent client tampering
const keys = ['998537qporhgpfangæ143+575?)(%lfjgaæ'];   // footprints of the keyboard kat

module.exports = {
    cookieObj: function (req, res) {
        return new Cookie(req, res, { keys: keys });
    }
}