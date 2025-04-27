const jwt = require('jsonwebtoken');
const User = require("../models/userModel.js");

const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(401).json({ errorMsg: "No token found. Please login first." });
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY, { algorithms: ["HS256"] });
        const user = await User.findById(decoded.userId).select("-password");

        if (!user) {
            return res.status(404).json({ errorMsg: "User not found. Please log in again." });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error("JWT Verification Error:", error.message);
        return res.status(401).json({ errorMsg: "Invalid or expired token. Please log in again." });
    }
};

module.exports = protectRoute;
