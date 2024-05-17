const { Type, Device } = require("../models/models");
const ApiError = require("../error/ApiError");
const DeviceService = require("../services/deviceService");

class TypeController {
  async create(req, res) {
    console.log("in type create");
    const { name } = req.body;
    const type = await Type.create({ name });
    return res.json(type);
  }

  async getAll(req, res) {
    const types = await Type.findAll();
    return res.json(types);
  }

  async getOne(req, res) {
    console.log("IN GETONE type id:", req.params);
    const { id } = req.params;
    const type = await Type.findOne({
      where: { id },
    });
    return res.json(type);
  }

  async delete(req, res) {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ error: "Type id is required" });
    }

    try {
      // Find all devices with the given type
      const devices = await Device.findAll({ where: { typeId: id } });

      // Delete each device
      for (const device of devices) {
        await DeviceService.deleteDeviceByName(device.name);
      }

      // Delete the type
      await Type.destroy({ where: { id } });

      return res.json({
        message: `Type id ${id} and all associated devices deleted successfully`,
      });
    } catch (error) {
      return res
        .status(500)
        .json({ error: `Error deleting type: ${error.message}` });
    }
  }
}

module.exports = new TypeController();
