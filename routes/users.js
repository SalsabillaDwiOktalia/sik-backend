const router = require('express').Router()
const usersController = require('../controller/users')

router.post('/login', usersController.login)
router.post('/register', usersController.register)

module.exports = router