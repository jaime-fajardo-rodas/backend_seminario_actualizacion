
const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    contrasena: {
        type: String,
        required: [true, 'La contraseña es obligatoria'],
    },
    estado: {
        type: Boolean,
        default: true
    },

});

UsuarioSchema.methods.toJSON = function(){
    const {__v,contrasena, _id, ...usuario } = this.toObject();
    usuario.uid = _id;
    return usuario;
}

module.exports = model( 'Usuario', UsuarioSchema );