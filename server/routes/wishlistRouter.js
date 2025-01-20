const Router = require('express')
const router = new Router()
const wishlistController = require('../contollers/wishlistController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/', authMiddleware, wishlistController.add)
router.post('/removeItem', authMiddleware, wishlistController.removeItem)
router.get('/', authMiddleware, wishlistController.getItems)

module.exports = router