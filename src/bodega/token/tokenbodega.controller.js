const jwt = require("jsonwebtoken");
const { createAccessToken } = require("../../libs/jwt");
const Bodega = require("../bodega.model");
const { TOKEN_SECRET } = require("../../../config");

exports.tokenbodega = async (req, res) => {
  const { bodega } = req.body;

  try {
    const bodegaFound = await Bodega.findOne({ _id: bodega });
    if (!bodegaFound) return res.status(404).json(["Bodega no existente"]);

    const tokenbodega = await createAccessToken({
      id: bodegaFound._id,
    });

    /*res.cookie("tokenbodega", token, {
      same_Site: "none",
      secure: true,
      httpOnly: false,
    });*/

    res.json({
      tokenbodega: tokenbodega,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.verifyTokenbodega = async (req, res) => {
  console.log(req.headers)
  const tokenbodega = req.headers.tokenbodega;
  console.log(tokenbodega)

  if (!tokenbodega) return res.send(false);

  jwt.verify(tokenbodega, TOKEN_SECRET, async (error, data) => {
    if (error) return res.sendStatus(401);

    const userFound = await Bodega.findById(data.id);
    if (!userFound) return res.sendStatus(401);


    console.log(userFound);

    return res.json({
      id: userFound._id,
      nombre: userFound.nombrebodega,
    });
  });
};
