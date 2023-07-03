const router = require('express').Router()
const kontrakController = require('../controller/kontrak')

router.post('/create', kontrakController.inputKontrak)
router.get('/get', kontrakController.getKontrak)


module.exports = router