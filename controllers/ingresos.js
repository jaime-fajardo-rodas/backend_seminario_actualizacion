const { response, request } = require("express");
const Ingreso = require("../models/ingreso");
const bcryptjs = require("bcryptjs");

const ingresosGet = async (req = request, res = response) => {
  
    
  const { desde = 0, limite = 5 } = req.query;
  const query = { estado: true };

  const [total, ingresos] = await Promise.all([
    Ingreso.countDocuments(query),
    Ingreso.find(query).skip(Number(desde)).limit(Number(limite)),
  ]);

  res.json({
    total,
    ingresos,
  });  
}; 

const ingresosGetById = async (req = request, res = response) => {
  
  const { id } = req.params;
  const ingreso = await Ingreso.findById(id);

  res.json({
    ingreso,
  });
};

const ingresosPut = async (req, res) => {
  const { id } = req.params;
  const ingresoBD = await Ingreso.findById(id);

  const { _id,...resto } = req.body;

  
  //Validación contraseña actual para cambio por una nueva
  /*
  if(contrasenaAnterior){
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
  } */

  await Ingreso.findByIdAndUpdate(id, resto);
  const ingreso = await Ingreso.findById(id);

  res.json({ingreso});
};

const ingresosPost = async (req, res) => {
  const { fecha, descripcion, valor, estado,cuentas,categorias} = req.body;
  const ingreso = new Ingreso({ fecha, descripcion, valor, estado,cuentas,categorias });


  //Guardar en BD
  await ingreso.save();

  res.json({
    ingreso,
  });
};

const ingresosDelete = async(req, res) => {
  const { id } = req.params;
  const { borrar_permanente } = req.body;

  await Ingreso.findByIdAndUpdate( id, {estado:false} );
  const ingreso = await Ingreso.findById(id);

  if(borrar_permanente === true){
    await Ingreso.findByIdAndDelete(id);
  }

  res.json({ingreso});

}

module.exports = {
    ingresosGet,
    ingresosGetById,
    ingresosPut,
    ingresosPost,
    ingresosDelete,
};
