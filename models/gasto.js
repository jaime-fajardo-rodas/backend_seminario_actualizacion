const { Schema, model } = require('mongoose');

const GastoSchema = Schema({
    fecha: {
        type: Date,
        required: [true, 'La fecha es obligatorio'],
    },
    nombre: {
        type: String,
        required: [true, 'EL nombre es obligatorio'],
    },
    valor: {
        type: Number,
        required: [true, 'El valor es obligatorio'],
    },
    cuenta: {
        type: Number,
        required: [true, 'La cuenta es obligatoria'],
    },
    categoria: {
        type: Number,
        required: [true, 'La categoria es obligatoria'],
    },
    usuario: {
        type: Number,
        required: [true, 'el usuario es obligatoria'],
    },
    estado: {
        type: Boolean,
        default: true
    },
});

GastoSchema.methods.toJSON = function(){
    const {__v, fecha, nombre, valor, cuenta, categoria, usuario, estado, _id, ...gasto} = this.toObject();
    gasto.uid = _id;
    return gasto;
}

module.exports = model( 'Gasto', GastoSchema );