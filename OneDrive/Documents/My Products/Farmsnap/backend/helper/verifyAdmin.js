import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

const verifyAdmin = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        console.log("token",token);
        
        if (!token) return res.status(401).json({ error: "Unauthorized" });

        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        if (!decoded) return res.status(400).json({ error: 'Token is not valid' });
        console.log("dec",decoded);
        
        const user = await User.findById(decoded);
        if (!user) return res.status(404).json({ error: 'User not found' });

        if (user.role !== 'ADMIN') return res.status(403).json({ error: 'You are not an admin' });

        req.user = user;
        next();
    } catch (error) {
        res.status(500).json({ error: 'Internal server error'});
    }
};

export default verifyAdmin;
