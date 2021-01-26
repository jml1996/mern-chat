const jwt = require('jsonwebtoken')
const secret = "easy_a"

module.exports = (req, res, next) => {
    const token = req.headers.authorization
    if(!token){
        res.status(401).json("gimme token")
    } else {
        jwt.verify(token, secret, (err, decoded) => {
            if(err){
                res.status(401).json(err.message)
            } else{
                req.decodedToken = decoded
                next()
            }
        })
    }
}
