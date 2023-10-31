const mongoose = require("mongoose");

const BodegaSchema = new mongoose.Schema(
  {
    nombrebodega: {
      type: String,
      required: true,
      unique: true,
    },
    idDoc: {
      type: Number,
      required: true,
      unique: true,
    },
    razonsocial: {
      type: String,
    },
    ubicacion: {
      type: String,
    },
    usuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    active: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Bodega", BodegaSchema);
