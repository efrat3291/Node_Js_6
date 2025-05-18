import jwt from "jsonwebtoken";

export const checkAuth = (req, res, next) => {
    try{
        const { authorization } = req.headers;
        const [, token] = authorization.split(" ");
        const secretKey = process.env.JWT_SECRET ||'JWT_SECRET';
        const user = jwt.verify(token, secretKey);
        if(!user) {
            return next({status: 403, message: "auth required"});
        }
        req.user = user;
        next();        
    }catch(err) {
        return next({status: 403, message: "auth required"});
    }
}

export const checkRole = (req, res, next) => {
    if(req.user.role !== "admin") {
        return next({status: 403, message: "you are not admin"});
    }
    next();
}