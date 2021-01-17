
const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const server = express()
const authRouter = require('./auth/auth-router')
// const postRouter = require('./posts/post-router')

server.use(express.json())
server.use(helmet())
server.use(cors())

server.get("/", (req, res) => {
    res.json({api:"up"})
})

server.use('/api', authRouter)

module.exports = server