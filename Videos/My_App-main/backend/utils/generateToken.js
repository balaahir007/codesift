const jwt = require("jsonwebtoken");

const generateToken = (res, userId) => {
    const token = jwt.sign({ userId }, process.env.SECRET_KEY, {
        expiresIn: '15d',
    });

    console.log(token);
    

    res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'lax',
        maxAge: 15 * 24 * 60 * 60 * 1000,  
    });
};

module.exports = generateToken;
