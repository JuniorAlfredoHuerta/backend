const mongoose = require("mongoose");

const Stock = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
      unique: true,
    },
    cantidad: {
      type: Number,
      required: true,
    },
    preciocompra: {
      type: Number,
      required: true,
    },
    precioventa: {
      type: Number,
    },
    ubicacion: {
      type: String,
    },
    description: {
      type: String,
    },
    alias: {
      type: [String],
    },
    bodega: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Bodega",
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

module.exports = mongoose.model("Stock", Stock);
