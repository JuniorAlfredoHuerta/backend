const jwt = require("jsonwebtoken");
const { TOKEN_SECRET } = require("./../../config");

exports.authRequired = (req, res, next) => {
  try {
    console.log(req.headers)
    const token = req.headers.authorization;
    
    console.log(token)

    if (!token)
      return res
        .status(401)
        .json({ message: "No token, authorization denied" });

    jwt.verify(token, TOKEN_SECRET, (error, user) => {
      if (error) {
        return res.status(401).json({ message: "Token is not valid" });
      }
      req.user = user;
      next();
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.bodegaRequired = (req, res, next) => {
  try {
    const tokenbodega = req.headers.tokenbodega;


    if (!tokenbodega)
      return res
        .status(401)
        .json({ message: "No token, authorization denied" });

    jwt.verify(tokenbodega, TOKEN_SECRET, (error, bodega) => {
      if (error) {
        return res.status(401).json({ message: "Token is not valid" });
      }
      else{"token verificado"}
      req.bodega = bodega;
      next();
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
