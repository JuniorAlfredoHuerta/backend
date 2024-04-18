const generalFunctions = require("../Generalfuctions");
const Bodega = require("./bodega.model");
const User = require("../user/user.model");

exports.createBodega = async (req, res) => {
  try {
    const { nombrebodega, idDoc, razonsocial, ubicacion } = req.body;

    // Validar que idDoc sea un número de 11 dígitos
    if (!/^\d{11}$/.test(idDoc)) {
      return res
        .status(400)
        .json({ error: "Este campo debe ser un número de 11 dígitos." });
    }

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
  try {
    const bodegas = await Bodega.find({ usuario: req.user.id }).populate(
      "usuario"
    );
    res.json(bodegas);
    //console.log(bodegas);
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
    return res.status(500).json({ message: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const deletedbodega = await Bodega.findByIdAndDelete(req.params.id);
    if (!deletedbodega)
      return res.status(404).json({ message: "Bodega not found" });

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
