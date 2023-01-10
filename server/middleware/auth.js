const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
    const token = req.cookies.token || req.body.token; 
    //  || req.header("Authorization").replace("Bearer", "");

    if (!token) {
        return res.status(403).send('Token is missing')
    }
    try {
    //verify token
        const decode = jwt.verify(token, process.env.SECRET_KEY)
        console.log(decode);
        req.user = {
            user_id: user._id
        } 
        res.status(200).json({
            success: true,
            message: 'token matched',
            user,
            decode
        })
        return next()

    } catch (error) {
        res.status(403).send('token is invalid')
    }
}

module.exports = auth;