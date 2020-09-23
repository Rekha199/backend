
const jwt = require("jsonwebtoken");
const key = require('../../default.json')

module.exports = function (req, res, next) {
    console.log('Within Auth Service...',req.headers);
    const token = req.headers["x-access-token"] || req.headers["authorization"];
    console.log('Token....',token);
    if (!token) return res.status(401).send("Access denied. No token provided.");
    try {
        const decoded = jwt.verify(token,key.myprivatekey);
        console.log('Decode ...',decoded);
        req.user = decoded;
        next();
    } catch (ex) {
        //if invalid token
        res.status(400).send("Invalid token.");
    }
};