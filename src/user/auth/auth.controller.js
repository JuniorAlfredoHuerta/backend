const User = require("../user.model");
const { TOKEN_SECRET } = require("../../../config");
const jwtt = require("../../libs/jwt");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.register = async (req, res) => {
  const { correo, password, username } = req.body;

  try {
    const userFound = await User.findOne({ correo });
    if (userFound) return res.status(400).json(["Correo ya en uso"]);

    const passwordhash = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      password: passwordhash,
      correo,
    });
    const userSaved = await newUser.save();
    console.log(userSaved);

    const token = await jwtt.createAccessToken({
      id: userSaved._id,
    });
    res.cookie("token", token, {
      sameSite: "none",
      secure: true,
      httpOnly: false,
    });
    res.json({
      id: userSaved._id,
      username: userSaved.username,
      correo: userSaved.correo,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  const { correo, password } = req.body;

  try {
    const userFound = await User.findOne({ correo });
    if (!userFound) return res.status(400).json(["Usuario no encontrado"]);

    const isMatch = await bcrypt.compare(password, userFound.password);
    if (!isMatch) return res.status(400).json(["Contraseña incorrecta"]);

    const token = await jwtt.createAccessToken({
      id: userFound._id,
    });

    res.cookie("token", token, {
      sameSite: "none",
      secure: true,
      httpOnly: false,
    });
    res.json({
      id: userFound._id,
      username: userFound.username,
      correo: userFound.correo,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.logout = async (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    secure: true,
    expires: new Date(0),
  });
  return res.sendStatus(200);
};

exports.verifyToken = async (req, res) => {
  const { token } = req.cookies;
  if (!token) return res.send(false);

  jwt.verify(token, TOKEN_SECRET, async (error, user) => {
    if (error) return res.sendStatus(401);

    const userFound = await User.findById(user.id);
    if (!userFound) return res.sendStatus(401);

    return res.json({
      id: userFound._id,
      username: userFound.username,
      correo: userFound.correo,
    });
  });
};