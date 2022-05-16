const { response, request } = require("express");
/*const Usuario = require("../models/usuario");*/
const Cuenta = require("../models/cuenta");
const bcryptjs = require("bcryptjs");

const cuentasGet = async (req = request, res = response) => {
  
  const { desde = 0, limite = 5 } = req.query;
  const query = { estado: true };

  const [total, cuentas] = await Promise.all([
    Cuenta.countDocuments(query),
    Cuenta.find(query).skip(Number(desde)).limit(Number(limite)),
  ]);

  res.json({
    total,
    cuentas,
  });
};

const cuentasGetById = async (req = request, res = response) => {
  
  const { id } = req.params;
  const cuenta = await cuenta.findById(id);

  res.json({
    cuenta,
  });
};

const cuentasPut = async (req, res) => {
  const { id } = req.params;
  const cuentaBD = await Cuenta.findById(id);

  const { _id,...resto } = req.body;

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

  await Cuenta.findByIdAndUpdate(id, resto);
  const cuenta = await Cuenta.findById(id);

  res.json({cuenta});
};

const cuentasPost = async (req, res) => {
  const { cuentaBanco, saldo,tipoCuenta, usuario } = req.body;
  const cuenta = new Cuenta({ cuentaBanco, saldo, tipoCuenta, usuario });

  
  //Guardar en BD
  await cuenta.save();

  res.json({
    cuenta,
  });
};

const cuentasDelete = async(req, res) => {
  const { id } = req.params;
  const { borrar_permanente } = req.body;

  await Cuenta.findByIdAndUpdate( id, {estado:false} );
  const cuenta = await Cuenta.findById(id);

  if(borrar_permanente === true){
    await Cuenta.findByIdAndDelete(id);
  }

  res.json({cuenta});

}

module.exports = {
  cuentasGet,
  cuentasGetById,
  cuentasPut,
  cuentasPost,
  cuentasDelete,
};
