const { UnauthenticatedError } = require('../utils/errors')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { sequelize } = require('../database/config')
const { QueryTypes } = require('sequelize')
const { userRoles } = require('../constants/users')

exports.register = async (req, res) => {

    return res.status(200).json( {
        message: "register works"
    })
}

exports.login = async (req, res) => {
    return res.status(200).json( {
        message: "login works"
    })
}