const Token = require("../models/token.model");

const isAuthenticatedMiddleware = async (req, res, next) => {
    const authHeader = req.headers?.authorization;
    console.log({authHeader: req.headers})
    if (!authHeader) {
        return res.status(403).send({
            "msg": "Please login first"
        });
    }

    const auth = authHeader.split("Bearer ")[1];
    console.log({auth})
    const token = await Token.findOne({ token: auth }).populate('user');
    console.log({token})
    if (!token){
        return res.status(403).send({
            "msg": "Please login first"
        });
    }

    req.session.user = token.user;
    req.session.token = token.token;

    console.log(req.session);
    next();
}

module.exports = isAuthenticatedMiddleware;