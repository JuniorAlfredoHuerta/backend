const { Router } = require("express");
const { login, register, logout, verifyToken } = require("./auth.controller");
const validateToken = require("../../middleware/validateToken");

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/profile", validateToken.authRequired, verifyToken);
router.get("/verify", verifyToken);

module.exports = router;
