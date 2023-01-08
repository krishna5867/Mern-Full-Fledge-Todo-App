const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const token = req.header("auth");
    // const token = req.cookies.token || req.body.token || 
    // req.header("Authorization").replace("Bearer", "");

    if (!token) {
        return res.status(403).send('token is missing')
    }
    try {
    //verify token
        const user = jwt.verify(token, process.env.SECRET_KEY)
        req.id = verifiedToken.id;
        console.log(user);
        req.user = {
            user_id: user.id
        } 
    } catch (error) {
        res.status(403).send('token is invalid')
    }
    return next();
}

module.exports = auth;