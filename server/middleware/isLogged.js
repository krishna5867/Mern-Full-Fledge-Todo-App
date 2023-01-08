const jwt = require('jsonwebtoken')

const isLogged = async(req, res, next) => {
    let token;

    if (
        req.cookies.token ||
        (req.headers.authorization && req.headers.authorization.startsWith("Bearer"))
        ) {
        token = req.cookies.token || req.headers.authorization.split(" ")[1]
    }

    if (!token) {
        throw new Error('Not authorized to access this route', 401)
    }

    try {
        const decoded = JWT.verify(token, process.env.SECRET_KEY)
        //_id, find user based on id, set this in req.user
        req.user = await User.findById(decoded._id, "email")
        next()
    } catch (error) {
        throw new Error('Not authorized to access this route', 401)
    }
    
}

module.exports = isLogged;