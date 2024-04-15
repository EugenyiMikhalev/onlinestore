const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User, Basket} = require('../models/models')
const { where } = require('sequelize')

const generateJwt = (id, email, role) => {
    return jwt.sign(
        {id, email, role}, 
        process.env.SECRET_KEY,
        {expiresIn:'24h'}
        )
}

class UserController {
    async registration(req, res, next) {
        const {email, password, role} = req.body
        if(!email || !password) {
            return next(ApiError.badRequest('Некорректный email или пароль'))
        }
        const condidate = await User.findOne({where: {email}})
        if(condidate) {
            return next(ApiError.badRequest('Пользователь с таким email уже существует'))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({email, role, password: hashPassword})
        const basket = await Basket.create({userId: user.id})
        const token = generateJwt(user.id, user.email, user.role)
        return res.json({token})
    }
 
    async login(req, res, next) {
        const {email, password} = req.body
        const user = await User.findOne({where: {email}})
        if (!user) {
            return next(ApiError.internal('Пользователь не найден'))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            return next(ApiError.internal('Указан неверный пароль'))
        }

        User.update({ last_login: new Date()} , {where: {email: email}})
        const token = generateJwt(user.id, user.email, user.role)
        return res.json({token})
    }

    async check(req, res, next) {
        const token = generateJwt(req.user.id, req.user.email, req.user.role)
        return res.json({token})
    }

    async accessAdmin(req, res, next) {
        if (req.user && req.user.role === 'ADMIN') {
            // return 
            next()
        } else {
            return res.status(403).json({ error: 'Unauthorized' }); // User is not authorized, return 403 Forbidden
        }
    }

    async getAll(req, res) {
        console.log('query:', JSON.stringify(req.query))

        let {page, limit} = req.query
        page = page || 1
        console.log('page:', page)
        limit = limit || 5
        let offset = page * limit - limit
        let users = await User.findAndCountAll({where: {},limit, offset});
        return res.json(users)
    }
}

module.exports = new UserController()