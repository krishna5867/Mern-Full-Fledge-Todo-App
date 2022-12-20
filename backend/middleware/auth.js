const jwt = require('jsonwebtoken')

const auth = (req, res, next) => {
    console.log(req.cookies);
    // const token = req.cookies.token || 
    // req.body.token || 
    // req.header("Authorization").replace("Bearer", "");

    const token = req.header('token') || req.cookies.token

    try {

    if (!token) {
        return res.status(403).send('token is missing')
    }

    //verify token
        const user = jwt.verify(token, 'shhhhh')
        console.log(user);
        req.user = user

        
    } catch (error) {
        res.status(403).send('token is invalid')
    }

    return next()
}

module.exports = auth;