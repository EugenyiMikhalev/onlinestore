const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true,  autoIncrement:true},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "USER"},
    phone: {type: DataTypes.STRING},
    last_login: {type: DataTypes.DATE, allowNull: false}
})

const Basket = sequelize.define('baskets', {
    id: {type: DataTypes.INTEGER, primaryKey: true,  autoIncrement:true},
    userId: { type: DataTypes.INTEGER, allowNull: false },
    status: {type: DataTypes.STRING}
})

const BasketDevice = sequelize.define('basket_devices', {
    id: {type: DataTypes.INTEGER, primaryKey: true,  autoIncrement:true},
    basketId: {type: DataTypes.INTEGER, allowNull: false},
    deviceId: {type: DataTypes.INTEGER, allowNull: false},
    price: {type: DataTypes.INTEGER, allowNull: false},
    quantity: {type: DataTypes.INTEGER, allowNull: false}
})

const Device = sequelize.define('device', {
    id: {type: DataTypes.INTEGER, primaryKey: true,  autoIncrement:true},
    name: {type: DataTypes.STRING, unique:true, allowNull: false},
    price: {type: DataTypes.INTEGER, allowNull:false},
    rating: {type: DataTypes.INTEGER, defaultValue: 0},
    img: {type: DataTypes.STRING, allowNull: false}
})

const DeviceImages = sequelize.define('device_images', {
    id: {type: DataTypes.INTEGER, primaryKey: true,  autoIncrement:true},
    filename: {type: DataTypes.STRING, allowNull: false},
    productId: {type: DataTypes.STRING, allowNull: false}
})

const Type = sequelize.define('type', {
    id: {type: DataTypes.INTEGER, primaryKey: true,  autoIncrement:true},
    name: {type: DataTypes.STRING, unique:true, allowNull: false},
})

const Brand = sequelize.define('brand', {
    id: {type: DataTypes.INTEGER, primaryKey: true,  autoIncrement:true},
    name: {type: DataTypes.STRING, unique:true, allowNull: false},
})

const Rating = sequelize.define('rating', {
    id: {type: DataTypes.INTEGER, primaryKey: true,  autoIncrement:true},
    rate: {type: DataTypes.INTEGER, allowNull: false},
    product_id: {type: DataTypes.INTEGER, allowNull: false},
    user_id: {type: DataTypes.INTEGER, allowNull: false},
})

const DeviceInfo = sequelize.define('device_info', {
    id: {type: DataTypes.INTEGER, primaryKey: true,  autoIncrement:true},
    title: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: false},
    // deviceId: {type: DataTypes.STRING, allowNull: false}
})

const TypeBrand = sequelize.define('type_brand', {
    id: {type: DataTypes.INTEGER, primaryKey: true,  autoIncrement:true}
})

User.hasOne(Basket)
Basket.belongsTo(User)

User.hasMany(Rating, { foreignKey: 'user_id' });
Rating.belongsTo(User, { foreignKey: 'user_id' });

Device.hasMany(DeviceImages, { foreignKey: 'productId', as: 'imgs'});
DeviceImages.belongsTo(Device, { foreignKey: 'productId' });

Device.hasMany(Rating, { foreignKey: 'product_id' });
Rating.belongsTo(Device, { foreignKey: 'product_id' });
Basket.hasMany(BasketDevice)
BasketDevice.belongsTo(Basket)

Type.hasMany(Device) 
Device.belongsTo(Type)

Brand.hasMany(Device)
Device.belongsTo(Brand) 

Device.hasMany(BasketDevice)
BasketDevice.belongsTo(Device)

Device.hasMany(DeviceInfo, {as:'info'})
DeviceInfo.belongsTo(Device)

Type.belongsToMany(Brand, {through: TypeBrand})
Brand.belongsToMany(Type, {through: TypeBrand})

module.exports = {
    User,
    Basket,
    BasketDevice,
    Device,
    Type,
    Brand,
    Rating,
    TypeBrand,
    DeviceInfo,
    DeviceImages
}