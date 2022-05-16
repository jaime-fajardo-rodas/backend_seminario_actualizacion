
const { Schema, model } = require('mongoose');

const CuentaSchema = Schema({
    cuentaBanco: {
        type: String,
        required: [true, 'Cuenta de banco es obligatorionombre'],
    },
    saldo: {
        type: Number,
        required: [true, 'El saldo es obligatorio'],
    },
    tipoCuenta: {
        type: String,
        required: [true, 'El tipo de cuenta es obligatorio'],
        
    },
    usuario: {
        type: String,
        required: [true, 'Usuario es obligatoria'],
    },
    estado: {
        type: Boolean,
        default: true
    },
  

});

CuentaSchema.methods.toJSON = function(){
    const {_id, ...cuenta } = this.toObject();
    cuenta.uid = _id;
    return cuenta;
}

module.exports = model( 'Cuenta', CuentaSchema );