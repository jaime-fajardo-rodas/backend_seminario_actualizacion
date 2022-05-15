
const { Schema, model } = require('mongoose');

const Categoriaschema = Schema({
    nombres: {
        type: String,
        required: [true, 'nombres es obligatorio'],
    },
    tipo_categoria: {
        type: String,
        required: [true, 'Tipo categoria es obligatorio'],
    },
   
    estado: {
        type: Boolean,
        default: true
    },

});

CategoriaSchema.methods.toJSON = function(){
    const {__v,nombres, tipo_categoria} = this.toObject();
    categoria.cid = _id;
    return categoria;
}

module.exports = model( 'Categoria', CategoriaSchema );