const Router = require('express')
const router = new Router()
const brandController = require('../contollers/brandController')


router.post('/',brandController.create)
router.get('/',brandController.getAll)
router.post('/delete',brandController.delete)
router.get('/:id', brandController.getOne)


module.exports = router