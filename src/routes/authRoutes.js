//api/v1/auth
const express = require('express')
const router = express.Router()

//user register
router.post('/register', validate(registerSchema), register)
//user login
router.post('/login', validate(loginSchema), login)

module.exports = router