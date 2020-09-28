
const jwt = require("jsonwebtoken");
const key = require('../../default.json')

module.exports = function (req, res, next) {
    const token = req.headers["x-access-token"] || req.headers["authorization"];
    if (!token) return res.status(401).send("Access denied. No token provided.");
    try {
        console.log('Checking token.');
        const decoded = jwt.verify(token,key.myprivatekey);
        req.user = decoded;
        next();
    } catch (ex) {
        //if invalid token
        res.status(400).send("Invalid token.");
    }
};