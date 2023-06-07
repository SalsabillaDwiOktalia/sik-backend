const router = require('express').Router()
const tugasController = require('../controller/tugas_kepalabiro')

router.post('/create', tugasController.inputTugas_kepalabiro)
router.get('/get/:id', tugasController.getTugas_kepalabiro)


module.exports = router