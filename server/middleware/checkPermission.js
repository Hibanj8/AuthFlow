import db from "../models/index.js";

async function verifyToken(req, res, next) {
    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: 'User not authenticated' });
    }

    try {  
        const validToken = db.jwt.verify(token, db.secretKey);
        if (validToken) {
            req.user = {
                id: validToken.id,
                username: validToken.username,
                email: validToken.email
            };
            
            req.authenticated = true;
            console.log(req.user);
            return next();
        }
    } catch (err) {
        return res.status(400).json({ error: err });
    }
}

const checkUserRole = (roles) => {
    return async (req, res, next) => {
        const token = req.headers.authorization.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: 'User not authenticated' });
        }

            try {
                const decodedToken = db.jwt.verify(token, db.secretKey);
                const id= decodedToken.id;
                const user = await db.User.findById(id).populate('roles');
                if (!user || !user.roles || user.roles.name !== roles) {
                    return res.status(403).json({ message: 'User does not have permission' });
                }
                next();
            } catch (error) {
                console.error("Error during admin verification:", error.message);
                return res.status(500).send("Internal Server Error");
            }
    
    } 
}

export const isUser = checkUserRole('user');
export const isAdmin = checkUserRole('admin');
export const isSuperAdmin = checkUserRole('superAdmin');
