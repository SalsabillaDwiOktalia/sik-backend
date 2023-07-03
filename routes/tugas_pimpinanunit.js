const router = require('express').Router()
const tugasController = require('../controller/tugas_pimpinanunit')
const {upload} = require('../uploadconfig')
const field =  upload.single('lampiran')

router.post('/create', field, tugasController.inputTugas_pimpinanunit)
router.get('/get/:id', tugasController.getTugas_pimpinanunit)
router.get('/get/tugas-kepala-biro/:id', tugasController.getTugasForKepalaBiro)

router.put('/update/status/:id', upload.single('hasil_tugas'), tugasController.updateTugas)
router.get('/update/selesai/:id', tugasController.tugasSelesai)
router.get('/detail/:id', tugasController.detail)


module.exports = router