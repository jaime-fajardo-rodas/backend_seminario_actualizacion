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
        type: Schema.Types.ObjectId,
        ref:'Cuenta',
        required: [true, 'La cuenta es obligatoria'],
    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref:'Categoria',
        required: [true, 'La categoria es obligatoria'],
    },
    estado: {
        type: Boolean,
        default: true
    },
});

GastoSchema.methods.toJSON = function(){
    const {_id, ...gasto} = this.toObject();
    gasto.uid = _id;
    return gasto;
}

module.exports = model( 'Gasto', GastoSchema );