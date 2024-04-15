const Router = require('express')
const router = new Router()
const userController = require('../contollers/userController')
const authMiddleware = require('../middleware/authMiddleware')
const checkRole = require('../middleware/checkRoleMiddleware')


router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.get('/auth',authMiddleware, userController.check)
router.get('/',authMiddleware, userController.getAll)
router.get('/admin',authMiddleware, checkRole('ADMIN'), userController.accessAdmin)


module.exports = router