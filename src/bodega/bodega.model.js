const mongoose = require('mongoose');

const BodegaSchema = new mongoose.Schema({
    nombrebodega: {
        type: String,
        required: true,
    },
    idDoc: {
        type: Number,
        required: true,
    },
    razonsocial: {
        type: String,
    },
    ubicacion: {
        type: String,
    },
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    active:{
        type:Boolean,
        default:false
    }
});

module.exports = mongoose.model('Bodega', BodegaSchema);
