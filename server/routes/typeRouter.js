const Router = require('express')
const router = new Router()
const typeController = require('../contollers/typeController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole('ADMIN'), typeController.create)
router.post('/delete', checkRole('ADMIN'), typeController.delete)
router.get('/', typeController.getAll)
router.get('/:id', typeController.getOne)

module.exports = router