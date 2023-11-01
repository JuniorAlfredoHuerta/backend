const express = require("express");
const ventaController = require("./venta.controller");
const { bodegaRequired } = require("../middleware/validateToken");

const router = express.Router();

router.post("/venta", bodegaRequired, ventaController.CreaVenta);
router.get("/venta", bodegaRequired, ventaController.getVentas);

module.exports = router;
