const express = require("express");
const bodegacontroller = require("./bodega.controller");

const auth = require("../middleware/validateToken");
const router = express.Router();

// Define las rutas utilizando las funciones del controlador

//todas las bodegas del cliente logeado
router.get("/bodegas", auth.authRequired, bodegacontroller.getUsers);
//update bodega
router.put("/bodegas/:id", auth.authRequired, bodegacontroller.updateUser);
//borrar bodega
router.put("/bodegasde/:id", auth.authRequired, bodegacontroller.deleteUser);
// crear bodega
router.post("/bodegas", auth.authRequired, bodegacontroller.createBodega);
//conseguir bodega por id
router.get("/bodegas/:id", auth.authRequired, bodegacontroller.getBodegasById);
// get all bodegas
router.get("/allbodegas", auth.authRequired, bodegacontroller.getAllBodegas);
module.exports = router;
