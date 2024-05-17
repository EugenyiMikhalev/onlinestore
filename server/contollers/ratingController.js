const {Rating} = require('../models/models')

class RatingController {
    async create(req, res) {
        console.log(req.body)
        const {product_id, rate, user_id} = req.body
        const newRate = await Rating.create({rate, product_id, user_id})
        return res.json(newRate)
    }

    async getOne(req, res) {
        const {id} = req.body
        const rate = await Rating.findOne(
            {
                where: {product_id: id}
            }
        )
        return res.json(rate)
    }

    async getAll(req, res) {
        let {id} = req.query
        console.log('producid:', id)
        if(!id) return res.json('undefined')
        let rates = await Rating.findAndCountAll({where: {product_id: id}})
        return res.json(rates)
    }
    // async getAll(req, res) {
    //     const brands = await Brand.findAll()
    //     return res.json(brands)
    // }

    // async delete(req, res) {
    //     const {name} = req.body
    //     await Brand.destroy({
    //         where: {
    //           name: name
    //         },
    //       });
    //     return res.json('brand deleted')
    // }

}

module.exports = new RatingController()