const generalFunctions = require('../Generalfuctions');
const Stock = require('./stock.model');
const Bodega = require('../bodega/bodega.model');

exports.createProducto = async (req, res) => {
    try {
      const userId = req.params.id; 
      const userData = req.body; 
  
      const stock = new Stock({
        nombre: userData.nombre,
        cantidad: userData.cantidad,
        preciocompra : userData.preciocompra,
        precioventa: userData.precioventa,
        ubicacion: userData.ubicacion,
        description: userData.description,
        alias: userData.alias,
        bodega: userId
      });
  
      await stock.save();
  
  
      res.status(201).json(stock);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error });
    }
  };

exports.getProductosbyBodegaId = async (req, res) => {
    try {
      const userId = req.params.id; 
      const stocks = await Stock.find({ bodega: userId });
  
      res.status(200).json(stocks);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error });
    }
  };

exports.getUsers = (req, res) => {
  generalFunctions.getModel(Stock, res);
}

exports.getUserById = (req, res) => {
  const { id } = req.params;
  generalFunctions.getModelById(Stock, id, res);
}

exports.updateUser = (req, res) => {
  const { id } = req.params;
  generalFunctions.updateModel(Stock, id, req, res);
}

exports.deleteUser = (req, res) => {
  const { id } = req.params;
  generalFunctions.deleteModel(Stock, id, res);
}