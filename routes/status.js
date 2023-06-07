const router = require('express').Router()
const statusController = require('../controller/status')

router.post('/create', statusController.inputStatus)
router.get('/getall', statusController.getStatus)
router.put('/update/:id', statusController.editStatus)
router.delete('/delete/:id', statusController.deleteStatus)
router.get('/get/:id', statusController.getbyid)


module.exports = router