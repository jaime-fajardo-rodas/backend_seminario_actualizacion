const { response, request } = require("express");
const Usuario = require("../models/categoria");
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
  const { _id, nombres, tipo_categoria, ...resto } = req.body;



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
  categoriasPut,
  categoriasPost,
  categoriasDelete,
  categoriasGetById
};
