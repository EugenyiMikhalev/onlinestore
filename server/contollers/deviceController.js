const uuid = require('uuid')
const path = require('path')
const fs = require('fs')
const {Device, DeviceInfo, DeviceImages, Rating, BasketDevice} = require('../models/models')
const ApiError = require('../error/ApiError')
const { Sequelize } = require('../db')
const DeviceService = require('../services/deviceService')


class DeviceController {
    async create(req, res, next) {
        try {
            const {name, price, brandId, typeId, info} = req.body

            // console.log('9999999999999999999999', req.files)
            let files = [];
            if (req.files.file.length) {
                files = req.files.file
            } else {

                files.push(req.files.file)
            }
            // console.log('YYYYYYYYYYY:', files)

            let fileName = uuid.v4() + ".jpg"

            files[0].mv(path.resolve(__dirname, '..', 'static', fileName))
            const device = await Device.create({name, price, brandId, typeId, img: fileName})

            if(info) {
                let parsedInfo = JSON.parse(info) //мб новую переменную надо
                parsedInfo.forEach(i =>
                    DeviceInfo.create({
                        title: i.title,
                        description: i.description,
                        deviceId: device.id
                    })    
                ) 
            }
            if(files[1]) {
                let images = files.slice(1)
                // console.log('imagessssssssssssssss:',images)
                images.forEach(async image => { 
                    
                    let fileName = uuid.v4() + ".jpg"
                    image.mv(path.resolve(__dirname, '..', 'static', fileName))
                    const newDeviceImage = await DeviceImages.create({
                        filename: fileName,
                        productId: device.id
                    })}
                )
            }


            return res.json(device)
        } catch (error) {
            next(ApiError.badRequest(error.message))
        } 
    }

    async getAll(req, res) {
        console.log('query:', JSON.stringify(req.query))

        let {brandId, typeId, limit, page, search, order} = req.query
        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit
        let devices;
        if(!search) search = ''
        let orderType = 'ASC'
        if(!order) {order = 'id'}
        else if (order === 'createdAt' || order === 'price') orderType = 'DESC'
        if(!brandId && !typeId) {
            console.log('STAAAAAAAAAAAAAAAAAART')
            devices = await Device.findAndCountAll(
                {
                   
                    attributes: [
                        'id',
                        'name',
                        'price',
                        'rating',
                        'img',
                        'createdAt',
                        'updatedAt',
                        'typeId',
                        'brandId',
                        // Sequelize.literal('"device".*'),
                        [Sequelize.literal('(SELECT AVG("ratings"."rate") FROM "ratings" WHERE "ratings"."product_id" = "device"."id")'), 'averageRating']
                    ],
                    where: {
                    name: {
                    [Sequelize.Op.iLike]: `%${search}%`,
                    },
              }, order: [[order, orderType]],limit, offset})
            console.log('ENDDDDDDDDDDDDDDDDDDDDDDDD', devices.rows[0])

        } if(brandId && !typeId) {
            devices = await Device.findAndCountAll({where:{brandId}, order: [[order, orderType]], limit, offset})
        } if(!brandId && typeId) {
            devices = await Device.findAndCountAll({where:{typeId}, order: [[order, orderType]], limit, offset})
        } if(brandId && typeId) {
            devices = await Device.findAndCountAll({where:{typeId,brandId}, order: [[order, orderType]], limit, offset})
        }
        
        // devices.rows.forEach(device => device.rating = await Rating.fin)
        console.log('KKKKKKKKKKKKKKKKKKKKKKK')

        return res.json(devices)
    }

    async getOne(req, res) {
        console.log('IN DEVICE GETONE id:', req.params)
        const {id} = req.params
        const device = await Device.findOne(
            {
                where: {id},
                include: [{model: DeviceInfo, as: 'info'}, {model: DeviceImages, as: 'imgs'}]
            }
        )
        return res.json(device)
    }


    async change(req, res) {
        try {
            const {id} = req.params
            const {name, price, brandId, typeId, info, deletedFiles} = req.body
            console.log('IN CHANGE DEVICE CONTROLLER')
            // console.log('RECIEVED DATA:', 'id:', id, 'name:', name, 'price:', price, 'brandId:', brandId, 'typeId:', typeId, 'info:', info, 'deletedFiles:', deletedFiles)
            
            let updatedDevice;
            let device;
             //найти device по айди
             device = await Device.findOne(
                {
                    where: {id}
                }
            )
            if(req.files && req.files.mainImg) {
                // console.log('mainImg changed')
                
                const newMainImg = req.files.mainImg
                // console.log('newMainImg file: ', newMainImg)
                let fileName = uuid.v4() + ".jpg"
                // console.log('fileName: ', fileName)

                newMainImg.mv(path.resolve(__dirname, '..', 'static', fileName))
               
                // console.log('device.img: ', device.img)
                
                const oldMainImagePath = path.resolve(__dirname, '..', 'static', device.img);
                // console.log('oldMainImagePath: ', oldMainImagePath)
                fs.unlinkSync(oldMainImagePath)

                updatedDevice = await Device.update(
                    { name, price, brandId, typeId, img: fileName},
                    { where: { id } }
                )
            } else {
                // console.log('mainImg didnt change')

                updatedDevice = await Device.update(
                    { name, price, brandId, typeId},
                    { where: { id } }
                )
                
            }
            // console.log('device:', device)

            const deletedFilesArray = JSON.parse(deletedFiles);
            if(deletedFilesArray.length !== 0) {
                // console.log('IN TRUE deletedFiles: ', deletedFilesArray)
                // console.log(typeof deletedFilesArray);
                deletedFilesArray.forEach(fileName => {
                    let fileNamePath = path.resolve(__dirname, '..', 'static', fileName);
                    // console.log('fileNamePath: ', fileNamePath)
                    fs.unlinkSync(fileNamePath)
                })

                try {
                    const deletedRowsFromDeviceImages = await DeviceImages.destroy({
                      where: {
                        filename: deletedFilesArray
                      }
                    });
                  
                    // console.log(`${deletedRowsFromDeviceImages} rows deleted successfully.`);
                  } catch (error) {
                    console.error('Error deleting rows:', error);
                  }
            }
            let additionalImgs = [];
            if (req.files && req.files.file) {
                additionalImgs = req.files.file
            }
            // console.log('additionalImgs:', additionalImgs)

            try {
                if(additionalImgs.length !== 0) {
                    let images = additionalImgs
                    // console.log('imagessssssssssssssss:',images)
                    images.forEach(async image => { 
                        
                        let fileName = uuid.v4() + ".jpg"
                        image.mv(path.resolve(__dirname, '..', 'static', fileName))
                        // console.log('device.id:', device.id)
                        const newDeviceImage = await DeviceImages.create({
                            filename: fileName,
                            productId: device.id
                        })}
                    )
                }
            } catch (error) {
                console.error('Error inserting rows:', error);
            }

            const infoArray = JSON.parse(info)
            // console.log('infoArray:', infoArray)
            try {
                await DeviceInfo.destroy(
                    {
                        where: {deviceId: device.id}
                    }
                )
                infoArray.forEach(async info => {
                    await DeviceInfo.create({
                        title: info.title, description: info.description, deviceId: device.id
                    })
    
                })
            } catch (error) {
                console.log('error in INFO adding:', error)
            }
            
            return res.json(updatedDevice)
        } catch (error) {
            return res.status(404).json({ error: 'error in device change: ' + error })
        } 
    }

    async delete(req, res) {
    //     const {name} = req.body
        
    //     // Ищем девайс по имени
    //     let device;
    //     try {
    //         device = await Device.findOne(
    //             {
    //                 where: {
    //                     name: name
    //                 },
    //             })
    //     } catch (error) {
    //         return res.status(404).json({ error: 'error in device delete - finding device: ' + error })
    //     }
        
    //     // Удаляем физ. картинки
    //     try {
    //         const mainImagePath = path.resolve(__dirname, '..', 'static', device.img);
    //         fs.unlinkSync(mainImagePath)

    //         const images = await DeviceImages.findAll({ where: { productId: device.id } });
    //             images.forEach((image) => {
    //                 const imagePath = path.resolve(__dirname, '..', 'static', image.filename);
    //                 fs.unlinkSync(imagePath);
    //             });

    //     } catch (error) {
    //         return res.status(404).json({ error: 'error in device delete - unlinking images: ' + error })
    //     }
        
    //     // Удаляем доп. картинки
    //     try {
    //         await DeviceImages.destroy({
    //             where: {
    //                 productId: device.id
    //             }
    //         })
    //     } catch (error) {
    //         return res.status(404).json({ error: 'error in device delete - deleting images: ' + error })
    //     }
        
    //     // Удаляем рейтинги
    //     try {
    //         await Rating.destroy({
    //             where: {
    //                 product_id: device.id
    //             }
    //         })
    //     } catch (error) {
    //         return res.status(404).json({ error: 'error in device delete - deleting ratings: ' + error })
    //     }

    //     // Удаляем из корзин
    //     try {
    //         await BasketDevice.destroy({
    //             where: {
    //                 deviceId: device.id
    //             }
    //         })
    //     } catch (error) {
    //         return res.status(404).json({ error: 'error in device delete - deleting from BasketDevices: ' + error })
    //     }

    //     // Удаляем продукт
    //     try {
    //         await Device.destroy({
    //             where: {
    //               name: name
    //             },
    //           });
    //         return res.json(`device ${name} deleted`)
    //     } catch (error) {
    //         return res.status(404).json({ error: 'error in device delete - deleting device: ' + error })
    //     }
    // }

    
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({ error: 'Device name is required' });
        }

        try {
            const result = await DeviceService.deleteDeviceByName(name);
            return res.json({ message: result });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new DeviceController()