const Router = require('express')
const router = new Router()
const basketController = require('../contollers/basketController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/', authMiddleware, basketController.add)
router.get('/getItems', authMiddleware, basketController.getItems)

module.exports = router