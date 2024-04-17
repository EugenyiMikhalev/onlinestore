const {Basket, BasketDevice} = require('../models/models')

class BasketController {
    async add(req, res) {
        // console.log("req.bodyyyyyyyyyyyyyyyyyyyyyyyy",req.body)
        const {userId, deviceId, price, quantity} = req.body
        let basket;

        
        try {
            basket = await Basket.findOne({where: {
                userId: userId, status: 'created'
            }})
            console.log('BASKET: ', basket)
        } catch (e) {
            e => console.log(e)
        }
        if(!basket) {
            try {
                console.log('creating new basket!')
                basket = await Basket.create({userId, status: 'created'}) }
            catch (e) {e => console.log('33333333', e)}
        }
        // console.log('444444444')
        let BasketItems
        try {
            BasketItems = await BasketDevice.create({basketId: basket.id, deviceId, price, quantity})

        } catch (e) {e => console.log('5555555555', e)}
        return res.json({basket, BasketItems})
    }

    async getItems(req, res) {
        // const {userId} = req.body
        // const Basket = await Basket.findOne(
        //     {where: {userId: userId}}
        // )
        // return res.json(Basket)
        try {
            const { userId } = req.body;
    
            // Find the cart by its ID
            const basket = await Basket.findOne(
                {where: {userId: userId}}
            )
    
            // If the cart exists, fetch all items in the cart
            if (cart) {
                const cartItems = await BasketDevice.findAll({
                    where: { basketId: basket.id }
                });
                res.status(200).json(cartItems);
            } else {
                res.status(404).json({ error: 'Cart not found' });
            }
        } catch (error) {
            console.error('Error fetching cart items:', error);
            res.status(500).json({ error: 'Failed to fetch cart items' });
        }
    }

    async delete(req, res) {
        const {name} = req.body
        await Basket.destroy({
            where: {
              name: name
            },
          });
        return res.json('Basket deleted')
    }

}

module.exports = new BasketController()