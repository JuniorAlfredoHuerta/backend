const Venta = require("./venta.model");

exports.CreaVenta = async (req, res) => {
  try {
    const { productos, preciototal } = req.body;

    const venta = new Venta({
      productos,
      preciototal,
      bodega: req.bodega.id,
    });

    const saveVenta = await venta.save();
    //console.log(saveVenta);
    res.status(201).json(saveVenta);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.getVentas = async (req, res) => {
  try {
    const ventas = await Venta.find({ bodega: req.bodega.id });
    res.json(ventas);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
