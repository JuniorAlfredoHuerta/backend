
function createModel(model, req, res) {
    const document = model(req.body);

  
    document
      .save()
      .then((data) => res.send(data))
      .catch((error) => res.json({ message: error }));
  }
  
  function getModel(model, res) {
    model
      .find()
      .then((data) => res.json(data))
      .catch((error) => res.json({ message: error }));
  }
  
  function getModelById(model, id, res) {
    model
      .findById(id)
      .then((data) => res.json(data))
      .catch((error) => res.json({ message: error }));
  }
  
  function updateModel(model, id, req, res) {
    const { name, idDoc, correo } = req.body;
    model
      .updateOne({ _id: id }, { $set: { name, idDoc, correo } })
      .then((data) => res.json(data))
      .catch((error) => res.json({ message: error }));
  }
  
  function deleteModel(model, id, res) {
    model
      .deleteOne({ _id: id })
      .then((data) => res.json(data))
      .catch((error) => res.json({ message: error }));
  }

  
  
  module.exports = {
    createModel,
    getModel,
    getModelById,
    updateModel,
    deleteModel,
  };
  