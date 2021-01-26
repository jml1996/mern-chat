
const jwt = require('jsonwebtoken')

const secret = "easy_a"
function createToken(user){
    const payload = {
        subject: user.id,
        username: user.username
    }
    const options = {
        expiresIn: '200000s'
    }
    return jwt.sign(payload, secret, options)
}
module.exports = createToken
