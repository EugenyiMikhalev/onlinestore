const { Device, DeviceImages, Rating, BasketDevice, DeviceInfo } = require("../models/models");
const path = require("path");
const fs = require("fs");

class DeviceService {
  static async deleteDeviceByName(name) {
    try {
      // Find the device by name
      const device = await Device.findOne({ where: { name } });
      if (!device) {
        throw new Error(`Device with name ${name} not found`);
      }

      // Delete physical images
      const mainImagePath = path.resolve(__dirname, "..", "static", device.img);
      if (fs.existsSync(mainImagePath)) {
        fs.unlinkSync(mainImagePath);
      }

      const images = await DeviceImages.findAll({
        where: { productId: device.id },
      });
      for (const image of images) {
        const imagePath = path.resolve(
          __dirname,
          "..",
          "static",
          image.filename
        );
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
        }
      }

      // Delete related records
      await DeviceImages.destroy({ where: { productId: device.id } });
      await Rating.destroy({ where: { product_id: device.id } });
      await BasketDevice.destroy({ where: { deviceId: device.id } });
      await DeviceInfo.destroy({where: {deviceId: device.id}})
      await Device.destroy({ where: { id: device.id } });
    

      return `Device ${name} deleted successfully`;
    } catch (error) {
      throw new Error(`Error deleting device: ${error.message}`);
    }
  }
}

module.exports = DeviceService;
