const User = require("./user.model");
const generalFunctions = require("../Generalfuctions");

exports.createUser = (req, res) => {
  generalFunctions.createModel(User, req, res);
};

exports.getUsers = (req, res) => {
  generalFunctions.getModel(User, res);
};

exports.getUserById = (req, res) => {
  const { id } = req.params;
  generalFunctions.getModelById(User, id, res);
};

exports.updateUser = async (req, res) => {
  try {
    const { username, name, idDoc, birthdate } = req.body;

    console.log(birthdate);
    const birthdayDate = new Date(birthdate);
    console.log(birthdayDate);

    const userupdate = await User.findOneAndUpdate(
      { _id: req.params.id },
      { username, name, idDoc, birthdate: birthdayDate }, // Utiliza el objeto Date
      { new: true }
    );
    return res.json(userupdate);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.deleteUser = (req, res) => {
  const { id } = req.params;
  generalFunctions.deleteModel(User, id, res);
};
