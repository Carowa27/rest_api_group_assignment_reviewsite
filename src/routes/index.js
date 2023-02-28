const express = require('express')
const router = express.Router()

const authRoutes = require('./authRoutes')
const userRoutes = require('./userRoutes')
const resortRoutes = require('./resortRoutes')

router.use('/auth', authRoutes)
router.use('/users', userRoutes)
router.use('/resorts', resortRoutes)

module.exports = router