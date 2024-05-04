const generalFunctions = require("../Generalfuctions");
const Stock = require("./stock.model");
const Bodega = require("../bodega/bodega.model");

exports.createProducto = async (req, res) => {
  try {
    const {
      nombre,
      cantidad,
      preciocompra,
      precioventa,
      ubicacion,
      description,
      alias,
    } = req.body;

    //console.log(req.bodega.id);

    const stock = new Stock({
      nombre,
      cantidad,
      preciocompra,
      precioventa,
      ubicacion,
      description,
      alias,
      bodega: req.bodega.id,
    });

    const savesstock = await stock.save();
    //console.log(stock);
    //console.log(savesstock);
    res.status(201).json(savesstock);
  } catch (error) {
    //console.error(error);
    res.status(500).json({ error: error });
  }
};

exports.getProductosbyBodegaId = async (req, res) => {
  try {
    const userId = req.params.id;
    const stocks = await Stock.find({ bodega: userId, active: true });

    res.status(200).json(stocks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error });
  }
};

exports.updateProducto = async (req, res) => {
  try {
    const {
      nombre,
      cantidad,
      preciocompra,
      precioventa,
      ubicacion,
      description,
      alias,
    } = req.body;
    const stockupdate = await Stock.findOneAndUpdate(
      { _id: req.params.id },
      {
        nombre,
        cantidad,
        preciocompra,
        precioventa,
        ubicacion,
        description,
        alias,
      },
      { new: true }
    );
    //console.log(stockupdate);
    return res.json(stockupdate);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

exports.getStockbyId = async (req, res) => {
  try {
    const stock = await Stock.findById(req.params.id);
    if (!stock) return res.status(404).json({ message: "stock not found" });
    return res.json(stock);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
exports.deleteStock = async (req, res) => {
  try {
    const stockdelete = await Stock.findOneAndUpdate(
      { _id: req.params.id },
      { active: false }, // Borrado logico
      { new: true }
    );
    return res.json(stockdelete);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.getStocks = async (req, res) => {
  try {
    const stocks = await Stock.find({ bodega: req.bodega.id, active: true });
    res.json(stocks);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
