const router = require('express').Router()
const kontrakController = require('../controller/kontrak')

router.post('/create', kontrakController.inputKontrak)
router.get('/get', kontrakController.getKontrak)
router.post('/perpanjang', kontrakController.getPerpanjangkontrak)
router.post('/pensiun', kontrakController.getPensiun)


module.exports = router