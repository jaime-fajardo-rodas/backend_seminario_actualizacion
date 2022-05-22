
const { Schema, model } = require('mongoose');

const CategoriaSchema = Schema({
    nombres: {
        type: String,
        required: [true, 'nombres es obligatorio'],
    },
    tipo_categoria: {
        type: String,
        required: [true, 'Tipo categoria es obligatorio'],
        enum: ['GASTO','INGRESO']
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref:'Usuario',
        required: [true, 'El usuario es obligatoria'],
    },
    estado: {
        type: Boolean,
        default: true
    },
});

CategoriaSchema.methods.toJSON = function(){
    const {_id, ...categoria } = this.toObject();
    categoria.cid = _id;
    return categoria;
}

module.exports = model( 'Categoria', CategoriaSchema );