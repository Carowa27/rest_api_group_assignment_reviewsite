//api/v1/users
const express = require('express')
const { isAuthenticated } = require('../middleware/authenticationMiddleware')
const router = express.Router()

//put om auth not admin -> user by id info
router.put("/:userId", isAuthenticated, updateUserById)
//delete om auth not admin -> user by id
router.delete("/:userId", deleteUserById)

//post new user
router.post("/", createUser)

module.exports = router