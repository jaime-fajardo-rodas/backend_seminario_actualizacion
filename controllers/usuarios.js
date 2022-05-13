const { response, request } = require("express");
const Usuario = require("../models/usuario");
const bcryptjs = require("bcryptjs");

const usuariosGet = async (req = request, res = response) => {
  
  const { desde = 0, limite = 5 } = req.query;
  const query = { estado: true };

  const [total, usuarios] = await Promise.all([
    Usuario.countDocuments(query),
    Usuario.find(query).skip(Number(desde)).limit(Number(limite)),
  ]);

  res.json({
    total,
    usuarios,
  });
};

const usuariosPut = async (req, res) => {
  const { id } = req.params;
  const { _id, contrasena, correo, ...resto } = req.body;

  if (contrasena) {
    const salt = bcryptjs.genSaltSync();
    resto.contrasena = bcryptjs.hashSync(contrasena, salt);
  }

  await Usuario.findByIdAndUpdate(id, resto);
  const usuario = await Usuario.findById(id);

  res.json({usuario});
};

const usuariosPost = async (req, res) => {
  const { nombres, apellidos, correo, contrasena } = req.body;
  const usuario = new Usuario({ nombres, apellidos, correo, contrasena });

  //Encriptar la constraseña
  //salto para encriptar cuantas vueltas, por defecto son 10
  const salt = bcryptjs.genSaltSync();
  usuario.contrasena = bcryptjs.hashSync(contrasena, salt);

  //Guardar en BD
  await usuario.save();

  res.json({
    usuario,
  });
};

const usuariosDelete = async(req, res) => {
  const { id } = req.params;
  const { borrar_permanente } = req.body;

  await Usuario.findByIdAndUpdate( id, {estado:false} );
  const usuario = await Usuario.findById(id);

  if(borrar_permanente === true){
    await Usuario.findByIdAndDelete(id);
  }

  res.json({usuario});

}

module.exports = {
  usuariosGet,
  usuariosPut,
  usuariosPost,
  usuariosDelete,
};
