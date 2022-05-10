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
  const { _id, usuario, contrasena, correo, ...resto } = req.body;

  if (contrasena) {
    const salt = bcryptjs.genSaltSync();
    resto.contrasena = bcryptjs.hashSync(contrasena, salt);
  }

  const user = await Usuario.findByIdAndUpdate(id, resto);

  res.json(user);
};

const usuariosPost = async (req, res) => {
  const { nombres, apellidos, correo, usuario, contrasena } = req.body;
  const user = new Usuario({ nombres, apellidos, correo, usuario, contrasena });

  //Encriptar la constraseña
  //salto para encriptar cuantas vueltas, por defecto son 10
  const salt = bcryptjs.genSaltSync();
  user.contrasena = bcryptjs.hashSync(contrasena, salt);

  //Guardar en BD
  await user.save();

  res.json({
    user,
  });
};

const usuariosDelete = async(req, res) => {
  const { id } = req.params;

  const usuario = await Usuario.findByIdAndUpdate( id, {estado:false} );

  res.json(usuario);

}

module.exports = {
  usuariosGet,
  usuariosPut,
  usuariosPost,
  usuariosDelete,
};
