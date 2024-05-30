const generalFunctions = require("../Generalfuctions");
const Bodega = require("./bodega.model");
const User = require("../user/user.model");

exports.createBodega = async (req, res) => {
  try {
    const { nombrebodega, idDoc, razonsocial, ubicacion } = req.body;

    const bodega = new Bodega({
      nombrebodega,
      idDoc,
      razonsocial,
      ubicacion,
      usuario: req.user.id,
    });

    const savedbodega = await bodega.save();
    res.status(201).json(savedbodega);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getBodegasById = async (req, res) => {
  try {
    const bodega = await Bodega.findById(req.params.id);
    if (!bodega) return res.status(404).json({ message: "Bodega not found" });
    return res.json(bodega);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.getUsers = async (req, res) => {
  //console.log(req.headers)
  const token = req.headers.authorization;
  //console.log(req.user.id)
  try {
    const bodegas = await Bodega.find({
      usuario: req.user.id,
      active: true,
    }).populate("usuario");
    res.json(bodegas);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.getAllBodegas = async (req, res) => {
  try {
    const bodegas = await Bodega.find({ active: true });
    res.json(bodegas);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { nombrebodega, idDoc, razonsocial, ubicacion } = req.body;
    const bodegaupdate = await Bodega.findOneAndUpdate(
      { _id: req.params.id },
      { nombrebodega, idDoc, razonsocial, ubicacion },
      { new: true }
    );
    return res.json(bodegaupdate);
  } catch (error) {
    //console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const bodegaupdate = await Bodega.findOneAndUpdate(
      { _id: req.params.id },
      { active: false }, // borrado logico
      { new: true }
    );
    return res.json(bodegaupdate);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
