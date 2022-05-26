const {Usuario, Gasto, Ingreso, Cuenta, Categoria} = require("../models");

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

const existeGastoPorId = async (id) => {
  const existeGasto = await Gasto.findById(id);
  if (!existeGasto) {
    throw new Error(`El ID: ${id} no se encuentra registrado en BD`);
  }
};

const existeCuentaPorId = async (id) => {
  const existeCuenta = await Cuenta.findById(id);
  if (!existeCuenta) {
    throw new Error(`El ID cuenta: ${id} no se encuentra registrado en BD`);
  }
};

const existeCategoriaPorId = async (id) => {
  const existeCategoria = await Categoria.findById(id);
  if (!existeCategoria) {
    throw new Error(`El ID categoria: ${id} no se encuentra registrado en BD`);
  }
};

const existeIngresoPorId = async (id) => {
  const existeIngreso = await Ingreso.findById(id);
  if (!existeIngreso) {
    throw new Error(`El ID: ${id} no se encuentra registrado en BD`);
  }
};

module.exports = {
  emailExiste,
  existeUsuarioPorId,
  existeGastoPorId,
  existeCuentaPorId,
  existeCategoriaPorId,
  existeIngresoPorId
};
