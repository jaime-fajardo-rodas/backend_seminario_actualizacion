
const { Schema, model } = require('mongoose');

const IngresoSchema = Schema({
    fecha: {
        type: Date,
        required: [true, 'Fecha es obligatorio'],
    },
    descripcion: {
        type: String,
        required: [true, 'La descripción del ingreso es obligatorio'],
    },
    valor: {
        type: Number,
        required: [true, 'El Valor es obligatorio'],
    },
    estado: {
        type: Boolean,
        default: true
    },

    cuentas: {
        type: String,
        required: [true, 'La cuenta es obligatoria'],
    },
    categorias: {
        type: String,
        required: [true, 'La cuenta es obligatoria'],
    },

});


IngresoSchema.methods.toJSON = function(){
    const {_id, ...ingreso } = this.toObject();
    ingreso.uid = _id;
    return ingreso;
} 

module.exports = model( 'Ingreso', IngresoSchema );