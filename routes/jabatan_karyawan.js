const router = require('express').Router()
const jabatan_karyawanController = require('../controller/jabatan_karyawan')

router.post('/create', jabatan_karyawanController.inputJabatan_Karyawan)
// router.get('/getall', karyawanController.getKaryawan)
router.put('/update/:id', jabatan_karyawanController.editJabatan_Karyawan)
router.delete('/delete/:id', jabatan_karyawanController.deleteJabatan_Karyawan)
// router.get('/get/:id', karyawanController.getbyid)
router.get('/get-kepala-biro', jabatan_karyawanController.getKepalaBiro)


module.exports = router