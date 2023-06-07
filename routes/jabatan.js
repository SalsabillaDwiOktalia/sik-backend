const router = require('express').Router()
const jabatanController = require('../controller/jabatan')

router.post('/create', jabatanController.inputJabatan)
router.get('/getall', jabatanController.getJabatan)
router.put('/update/:kode', jabatanController.editJabatan)
router.delete('/delete/:kode', jabatanController.deleteJabatan)
router.get('/get/:kode', jabatanController.getbyid)
router.get('/get/notexist/:id', jabatanController.jabatanNotExist)


module.exports = router