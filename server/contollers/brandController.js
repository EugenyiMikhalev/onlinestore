const { Brand, Device } = require("../models/models");
const DeviceService = require("../services/deviceService");

class BrandController {
  async create(req, res) {
    const { name } = req.body;
    const brand = await Brand.create({ name });
    return res.json(brand);
  }

  async getAll(req, res) {
    const brands = await Brand.findAll();
    return res.json(brands);
  }

  async getOne(req, res) {
    console.log("IN GETONE brand id:", req.params);
    const { id } = req.params;
    const brand = await Brand.findOne({
      where: { id },
    });
    return res.json(brand);
  }

  async delete(req, res) {
    // const {name} = req.body
    // await Brand.destroy({
    //     where: {
    //       name: name
    //     },
    //   });
    // return res.json('brand deleted')
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ error: "Brand id is required" });
    }

    try {
      // Find all devices with the given brand
      const devices = await Device.findAll({ where: { brandId: id } });

      // Delete each device
      for (const device of devices) {
        await DeviceService.deleteDeviceByName(device.name);
      }

      // Delete the brand
      await Brand.destroy({ where: { id } });

      return res.json({
        message: `Brabd id ${id} and all associated devices deleted successfully`,
      });
    } catch (error) {
      return res
        .status(500)
        .json({ error: `Error deleting brand: ${error.message}` });
    }
  }
}

module.exports = new BrandController();
