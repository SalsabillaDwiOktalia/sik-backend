const router = require('express').Router()
const karyawanController = require('../controller/karyawan')

router.post('/create', karyawanController.inputKaryawan)
router.get('/getall', karyawanController.getKaryawan)
router.put('/update/:id', karyawanController.editKaryawan)
router.delete('/delete/:id', karyawanController.deleteKaryawan)
router.get('/get/:id', karyawanController.getbyid)
router.get('/get-jabatan/:id', karyawanController.getjabatan_Karyawan)
router.get('/get-jabatan/by-level/:id', karyawanController.getjabatan_Karyawan_by_level)
router.get('/kategori/get', karyawanController.getKategori)


module.exports = router