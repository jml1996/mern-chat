const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../user/user-model')
const createToken = require('./createToken')
const { credCheck } = require('./credcheck-middleware')
const restrict = require('./restricted-middleware')

const checkPayload = (req, res, next) => {
    if (!req.body.username || !req.body.password) {
      res.status(401).json('bad payload')
    } else {
      next()
    }
  }
  const checkUsernameUnique = async (req, res, next) => {
    try {
      const rows = await User.getBy({ username: req.body.username })
      if (!rows.length) {
        next()
      } else {
        res.status(401).json('username taken')
      }
    } catch (err) {
      res.status(500).json(err.message)
    }
  }


router.post('/register', checkPayload, checkUsernameUnique, (req, res) => {
 const creds = req.body

 if(credCheck(creds)){
    const hash = bcrypt.hashSync(creds.password, 8)
    creds.password = hash
    console.log(creds)
    User.addUser(creds)
    .then(user => {
        res.status(201).json(user)
    })
    .catch(err => res.status(500).json({message:err.message}))
 } else{
     res.status(400).json({message:'incorrect credentials'})
 }
})


router.post('/login', checkPayload, (req, res) => {
    const {password, username} = req.body
    if(credCheck(req.body)){
        User.getBy({username: username})
        .then(([user]) => {
            if(user && bcrypt.compareSync(password, user.password)){
                const token = createToken(user)
                res.status(200).json({
                    message: 'welcome in, ' + user.username,
                    token
                })
            } else {
                res.status(401).json("nice try, no token")
            }
        })
        .catch(err => res.status(500).json({message:err.message}))
    } else {
        res.status(401).json('you tried lol')
    }
})
router.get("/users", restrict, (req, res) => {
    User.getUser()
    .then(users => {
        res.status(200).json(users)
    })
    .catch(err => res.send(err))
})

module.exports = router