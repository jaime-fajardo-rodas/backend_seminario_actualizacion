const { response, request } = require("express");
const Categoria = require("../models/categoria");
const bcryptjs = require("bcryptjs");

const categoriasGet = async (req = request, res = response) => {
  
  const { desde = 0, limite = 5 } = req.query;
  const query = { estado: true };

  const [total, categorias] = await Promise.all([
    Categoria.countDocuments(query),
    Categoria.find(query).skip(Number(desde)).limit(Number(limite)),
  ]);

  res.json({
    total,
    categorias,
  });
};

const categoriasGetById = async (req = request, res = response) => {
  
  const { id } = req.params;
  const categoria = await Categoria.findById(id);

  res.json({
    categoria,
  });
};

const categoriasPut = async (req, res) => {
  const { id } = req.params;
  const usuarioBD = await Categoria.findById(id);

  const { _id, ...resto } = req.body;

  /*Validación contraseña actual para cambio por una nueva*/
 /* if(contrasenaAnterior){
    //verficar la contrasena
    const validContrasena = bcryptjs.compareSync(contrasenaAnterior,usuarioBD.contrasena);
    if(!validContrasena){
        return res.status(400).json({
            msg: 'Contraseña anterior no es correcta'
        });
    }

    if (contrasena) {
      const salt = bcryptjs.genSaltSync();
      resto.contrasena = bcryptjs.hashSync(contrasena, salt);
    }
  }*/

  await Categoria.findByIdAndUpdate(id, resto);
  const categoria = await Categoria.findById(id);

  res.json({categoria});
};

const categoriasPost = async (req, res) => {
  const { nombres, tipo_categoria } = req.body;
  const categoria = new Categoria({ nombres, tipo_categoria });


  //Guardar en BD
  await categoria.save();

  res.json({
    categoria,
  });
};

const categoriasDelete = async(req, res) => {
  const { id } = req.params;
  const { borrar_permanente } = req.body;

  await Categoria.findByIdAndUpdate( id, {estado:false} );
  const categoria = await Categoria.findById(id);

  if(borrar_permanente === true){
    await Categoria.findByIdAndDelete(id);
  }

  res.json({categoria});

}

module.exports = {
  categoriasGet,
  categoriasGetById,
  categoriasPut,
  categoriasPost,
  categoriasDelete,
 
};
