const express = require("express");
const userController = require("./user.controller");
const auth = require("../middleware/validateToken");

const router = express.Router();

// Define las rutas utilizando las funciones del controlador
router.post("/users", auth.authRequired, userController.createUser);
router.get("/users", auth.authRequired, userController.getUsers);
router.get("/users/:id", auth.authRequired, userController.getUserById);
router.put("/users/:id", auth.authRequired, userController.updateUser);
router.delete("/users/:id", auth.authRequired, userController.deleteUser);

module.exports = router;
