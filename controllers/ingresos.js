const { response, request } = require("express");
const Ingreso = require("../models/ingreso");

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

  await Ingreso.findByIdAndUpdate(id, resto);
  const ingreso = await Ingreso.findById(id);

  res.json({ingreso});
};

const ingresosPost = async (req, res) => {
  const { fecha, descripcion, valor, cuenta, categoria, estado} = req.body;

  const data = {
    fecha: fecha,
    descripcion: descripcion,
    valor: valor,
    cuenta: cuenta._id,
    categoria: categoria._id,
    estado: estado,
};
  const ingreso = new Ingreso(data);

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
