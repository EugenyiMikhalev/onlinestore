const Router = require('express')
const router = new Router()
const deviceController = require('../contollers/deviceController')

router.post('/', deviceController.create)
router.post('/delete', deviceController.delete)
router.get('/', deviceController.getAll)
router.get('/:id', deviceController.getOne)

module.exports = router