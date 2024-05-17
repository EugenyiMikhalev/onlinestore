const Router = require('express')
const router = new Router()
const basketController = require('../contollers/basketController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/', authMiddleware, basketController.add)
router.post('/changeQuantity', authMiddleware, basketController.changeQuantity)
router.post('/removeItem', authMiddleware, basketController.removeItem)
router.get('/', authMiddleware, basketController.getItems)

module.exports = router