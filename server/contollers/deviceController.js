const uuid = require('uuid')
const path = require('path')
const {Device, DeviceInfo} = require('../models/models')
const ApiError = require('../error/ApiError')
const { Sequelize } = require('../db')


class DeviceController {
    async create(req, res, next) {
        try {
            const {name, price, brandId, typeId, info} = req.body

            
            const {file} = req.files


            let fileName = uuid.v4() + ".jpg"

            file.mv(path.resolve(__dirname, '..', 'static', fileName))
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


            return res.json(device)
        } catch (error) {
            next(ApiError.badRequest(error.message))
        } 
    }

    async getAll(req, res) {
        let {brandId, typeId, limit, page, search} = req.query
        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit
        let devices;
        if(!brandId && !typeId) {
            devices = await Device.findAndCountAll({where: {
                name: {
                  [Sequelize.Op.iLike]: `%${search}%`,
                },
              },limit, offset})
        } if(brandId && !typeId) {
            devices = await Device.findAndCountAll({where:{brandId}, limit, offset})
        } if(!brandId && typeId) {
            devices = await Device.findAndCountAll({where:{typeId}, limit, offset})
        } if(brandId && typeId) {
            devices = await Device.findAndCountAll({where:{typeId,brandId}, limit, offset})
        }
        return res.json(devices)
    }

    async getOne(req, res) {
        const {id} = req.params
        const device = await Device.findOne(
            {
                where: {id},
                include: [{model: DeviceInfo, as: 'info'}]
            }
        )
        return res.json(device)
    }

}

module.exports = new DeviceController()