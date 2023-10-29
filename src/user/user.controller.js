const User = require('./user.model');
const generalFunctions = require('../Generalfuctions');

exports.createUser = (req, res) => {
  generalFunctions.createModel(User, req, res);
}

exports.getUsers = (req, res) => {
  generalFunctions.getModel(User, res);
}

exports.getUserById = (req, res) => {
  const { id } = req.params;
  generalFunctions.getModelById(User, id, res);
}

exports.updateUser = (req, res) => {
  const { id } = req.params;
  generalFunctions.updateModel(User, id, req, res);
}

exports.deleteUser = (req, res) => {
  const { id } = req.params;
  generalFunctions.deleteModel(User, id, res);
}

