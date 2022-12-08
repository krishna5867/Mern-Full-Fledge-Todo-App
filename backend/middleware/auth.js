const jwt = require('jsonwebtoken')

const auth = (req, res, next) => {
    console.log(req.cookies);
    const token = req.cookies.token || 
    req.body.token || 
    req.header("Authorization").replace("Bearer", "");

    //if token is not there
    if (!token) {
        return res.status(403).send('token is missing')
    }

    //verify token
    try {
        const decode = jwt.verify(token, 'shhhhh')
        console.log(decode);
        req.user = decode

        
    } catch (error) {
        res.status(403).send('token is invalid')
    }

    return next()
}

module.exports = auth