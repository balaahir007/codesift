import jwt from 'jsonwebtoken';

const generateToken = (res, userId) => {
    try {
        const payload = { userId };
        const token = jwt.sign(payload, process.env.SECRET_KEY, {
            expiresIn: '15d',
        })
        
        if (res) {
            res.cookie('jwt', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV !== 'development',
                sameSite: 'lax',
                maxAge: 15 * 24 * 60 * 60 * 1000, 
            });
        }        
        return token;
    } catch (error) {
        console.error("Token Generation Error:", error);
        if (res) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        throw new Error("Token Generation Failed");
    }
};

export default generateToken;
