const { Router } = require("express");
const { tokenbodega, verifyTokenbodega } = require("./tokenbodega.controller");
const validateToken = require("../../middleware/validateToken");

const router = Router();

router.post("/bodegatoken", tokenbodega);
router.get("/bodegatoken", verifyTokenbodega);

module.exports = router;
