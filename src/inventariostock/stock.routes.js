const express = require("express");
const stockController = require("./stock.controller");
const { bodegaRequired } = require("../middleware/validateToken");

const router = express.Router();

// Define las rutas utilizando las funciones del controlador
router.get("/stocks", bodegaRequired, stockController.getStocks);
router.get("/stock/:id", bodegaRequired, stockController.getStockbyId);
router.put("/stock/:id", bodegaRequired, stockController.updateProducto);
router.put("/stockde/:id", bodegaRequired, stockController.deleteStock);
router.post("/stock", bodegaRequired, stockController.createProducto);
router.get(
  "/stock/user/:id",
  bodegaRequired,
  stockController.getProductosbyBodegaId
);

module.exports = router;
