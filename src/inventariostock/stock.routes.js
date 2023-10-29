const express = require('express');
const stockController = require('./stock.controller'); 

const router = express.Router();

// Define las rutas utilizando las funciones del controlador
router.get("/stock", stockController.getUsers);
router.get("/stock/:id", stockController.getUserById);
router.put("/stock/:id", stockController.updateUser);
router.delete("/stock/:id", stockController.deleteUser);
router.post('/stock/:id/', stockController.createProducto );
router.get('/stock/user/:id', stockController.getProductosbyBodegaId);


module.exports = router;
