const router = require('express').Router()
const unit_kerjaController = require('../controller/unit_kerja')

router.post('/create', unit_kerjaController.inputUnit_Kerja)
router.get('/getall', unit_kerjaController.getUnit_Kerja)
router.put('/update/:id', unit_kerjaController.editUnit_Kerja)
router.delete('/delete/:id', unit_kerjaController.deleteUnit_Kerja)
router.get('/get/:id', unit_kerjaController.getbyid)


module.exports = router