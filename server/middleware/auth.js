const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
    const token = req.cookies.token || req.body.token;
    if (!token) {
        return res.status(403).send('Token is missing')
    }
    try {
    //verify token
        const decode = jwt.verify(token, process.env.SECRET_KEY)
        req.user = decode.user_id;
        // console.log(req.user);
        return next()
    } catch (error) {
        res.status(403).send(error.message)
    }
}

module.exports = auth;