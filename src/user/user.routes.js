const express = require('express');
const userController = require('./user.controller'); 

const router = express.Router();

// Define las rutas utilizando las funciones del controlador
router.post("/users", userController.createUser);
router.get("/users", userController.getUsers);
router.get("/users/:id", userController.getUserById);
router.put("/users/:id", userController.updateUser);
router.delete("/users/:id", userController.deleteUser);


module.exports = router;
