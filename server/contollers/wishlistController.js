const {Wishlist, WishlistDevice} = require('../models/models')

class WishlistController {
    async add(req, res) {
        //Добавление в корзину: ищем корзину со статусом 'created' если нет, то создаем новую
        //ищем в корзине девайс по айди, если есть, то увеличиваем quantity если нет, то добавляем
        const {userId, deviceId, price} = req.body
        let wishlist;

        
        try {
            wishlist = await Wishlist.findOne({where: {
                userId: userId
            }})
            console.log('Wishlist: ', wishlist)
        } catch (e) {
            e => console.log(e)
        }
        if(!wishlist) {
            try {
                console.log('creating new wishlist!')
                wishlist = await Wishlist.create({userId}) }
            catch (e) {e => console.log('33333333', e)}
        }
        // console.log('444444444')
        let WishlistItems
        try {
            console.log('in try')
            WishlistItems = await WishlistDevice.findOne({where: {
                deviceId: deviceId, wishlistId: wishlist.id
            }})
            console.log(WishlistItems)

            if (WishlistItems) {
            console.log('in if')

            
                console.log('item already in wishlist!')
                // return res.json({wishlist, update})
                return res.json(wishlistItems)
                
            }
        } catch (error) {
            e => console.log('44444', e)
        }

        if(!WishlistItems) {
        try {
            console.log('skipped return')
            WishlistItems = await WishlistDevice.create({wishlistId: wishlist.id, deviceId, price})

        } catch (e) {e => console.log('5555555555', e)} }
        const wishlistItems = await WishlistDevice.findAll({
            where: { wishlistId: wishlist.id }
        });
        console.log('wishlistItems:', wishlistItems)
        return res.json(wishlistItems)
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
    
            // Find the wishlist by its ID
            const wishlist = await Wishlist.findOne(
                {where: {userId: userId}}
            )
            console.log('wishlist:', wishlist)
            // If the cart exists, fetch all items in the cart
            if (wishlist) {
                const wishlistItems = await WishlistDevice.findAll({
                    where: { wishlistId: wishlist.id }
                });
                console.log('wishlistItems:', wishlistItems)
                return res.json(wishlistItems)
                // res.status(200).json(cartItems);
            } else {
                res.status(404).json({ error: 'Wishlist not found' });
            }
        } catch (error) {
            console.error('Error fetching wishlist items:', error);
            res.status(500).json({ error: 'Failed to fetch wishlist items' });
        }
    }

    async delete(req, res) {
        const {name} = req.body
        await Wishlist.destroy({
            where: {
              name: name
            },
          });
        return res.json('Wishlist deleted')
    }

    async removeItem(req, res) {
        console.log('in delete:', req.body)
        const {deviceId, wishlistId} = req.body
        await WishlistDevice.destroy({
            where: {
                deviceId: deviceId, wishlistId: wishlistId
            }
        })
        return res.json('item deleted')
    }

    // async changeQuantity(req, res) {
    //     console.log('in change quantity', req.body)
    //     const {deviceId, wishlistId, quantity} = req.body
    //     let update
    //     try {
    //     update = await WishlistDevice.update(
    //         {quantity: quantity}, {where: {deviceId, wishlistId}}
    //     ) }
    //     catch (e) {
    //         e => console.log(e)
    //     }
    //     return res.json(update)
    // }
}

module.exports = new WishlistController()