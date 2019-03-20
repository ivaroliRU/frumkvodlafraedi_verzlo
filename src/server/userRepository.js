const crypto = require('crypto');
const jwt = require('jsonwebtoken');

module.exports.generateSalt = function () {
    return crypto.randomBytes(16).toString('hex');
};

module.exports.getHashPassword = function (password, salt) {
    return crypto.pbkdf2Sync(password, salt, 10000, 512, 'sha512').toString('hex');
};

module.exports.validatePassword = function (hash, password, salt) {
    const passhash = crypto.pbkdf2Sync(password, salt, 10000, 512, 'sha512').toString('hex');
    return passhash === hash;
};