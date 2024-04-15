const Router = require('express')
const router = new Router()
const ratingController = require('../contollers/ratingController')


router.post('/',ratingController.create)
router.get('/', ratingController.getAll)

module.exports = router