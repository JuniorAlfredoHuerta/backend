const mongoose = require("mongoose");

const VentaSchema = new mongoose.Schema(
  {
    productos: [
      {
        _id: false,
        nombre: String,
        cantidad: Number,
        precioVenta: Number,
      },
    ],

    preciototal: {
      type: Number,
    },
    bodega: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Bodega",
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Venta", VentaSchema);
