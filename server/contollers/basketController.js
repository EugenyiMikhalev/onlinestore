const {Basket, BasketDevice} = require('../models/models')

class BasketController {
    async add(req, res) {
        //Добавление в корзину: ищем корзину со статусом 'created' если нет, то создаем новую
        //ищем в корзине девайс по айди, если есть, то увеличиваем quantity если нет, то добавляем
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
            console.log('in try')
            BasketItems = await BasketDevice.findOne({where: {
                deviceId: deviceId, basketId: basket.id
            }})
            console.log(BasketItems)

            if (BasketItems) {
            console.log('in if')

            BasketItems = await BasketDevice.increment('quantity', {by: 1, where: {deviceId: deviceId, basketId: basket.id}})
                console.log(BasketItems)
                // return res.json({basket, update})
            }
        } catch (error) {
            e => console.log('44444', e)
        }

        if(!BasketItems) {
        try {
            console.log('skipped return')
            BasketItems = await BasketDevice.create({basketId: basket.id, deviceId, price, quantity})

        } catch (e) {e => console.log('5555555555', e)} }
        const cartItems = await BasketDevice.findAll({
            where: { basketId: basket.id }
        });
        console.log('cartItems:', cartItems)
        return res.json(cartItems)
        // return res.json({basket, BasketItems})
    }

    async getItems(req, res) {
        // const {userId} = req.body
        // const Basket = await Basket.findOne(
        //     {where: {userId: userId}}
        // )
        // return res.json(Basket)
        console.log('in getItems', req.query)
        try {
            const { userId } = req.query;
    
            // Find the cart by its ID
            const basket = await Basket.findOne(
                {where: {userId: userId, status: 'created'}}
            )
            console.log('basket:', basket)
            // If the cart exists, fetch all items in the cart
            if (basket) {
                const cartItems = await BasketDevice.findAll({
                    where: { basketId: basket.id }
                });
                console.log('cartItems:', cartItems)
                return res.json(cartItems)
                // res.status(200).json(cartItems);
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

    async removeItem(req, res) {
        console.log('in delete:', req.body)
        const {deviceId, basketId} = req.body
        await BasketDevice.destroy({
            where: {
                deviceId: deviceId, basketId: basketId
            }
        })
        return res.json('item deleted')
    }

    async changeQuantity(req, res) {
        console.log('in change quantity', req.body)
        const {deviceId, basketId, quantity} = req.body
        let update
        try {
        update = await BasketDevice.update(
            {quantity: quantity}, {where: {deviceId, basketId}}
        ) }
        catch (e) {
            e => console.log(e)
        }
        return res.json(update)
    }
}

module.exports = new BasketController()