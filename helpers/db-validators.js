const {Usuario} = require("../models");

//verificar si el correo existe
const emailExiste = async (correo = "") => {
  const existeEmail = await Usuario.findOne({ correo });
  if (existeEmail) {
    throw new Error(`El correo: ${correo} ya se encuentra registrado en BD`);
  }
};

const existeUsuarioPorId = async (id) => {
  const existeUsuario = await Usuario.findById(id);
  if (!existeUsuario) {
    throw new Error(`El ID: ${id} no se encuentra registrado en BD`);
  }
};

module.exports = {
  emailExiste,
  existeUsuarioPorId
};
