const jwt = require("jsonwebtoken");
const User = require("../models/User");

class authenticateJWT {
    static authentication(req,res,next) {
        if(!req.headers.authorization) {
            throw { name: "AuthenticationError", message: "No token provided" };
        }
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.decoded = decoded;
        next();
    }
    static authAdmin(req,res,next) {
        if(!req.headers.authorization) {
            throw { name: "AuthenticationError", message: "No token provided" };
        }
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        if(decoded.role !== "admin") {
            throw { name: "AuthenticationError", message: "You are not admin" };
        }
        req.decoded = decoded;
        next();
    }
}

module.exports = authenticateJWT;