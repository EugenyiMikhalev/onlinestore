const jwt = require('jsonwebtoken')

module.exports = function(role) {
    return function (req, res, next) {
        console.log('4')
        if (req.method === "OPTIONS") {
            console.log('1')
            next()
        }
        try {
            const token = req.headers.authorization.split(' ')[1]
            console.log('2')

            if (!token) {
                res.status(401).json({message: "Пользователь не авторизован"})
            }
            const decoded = jwt.verify(token, process.env.SECRET_KEY)
            if(decoded.role !== role) {
                res.status(403).json({message: "Нет доступа"})
                
            }
            req.user = decoded
            next()
        } catch (e) {
            res.status(401).json({message: "Пользователь не авторизован"})
        }
    }
}

