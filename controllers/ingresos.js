const { response, request } = require("express");
const { Ingreso, Categoria, Cuenta } = require("../models");

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

const ingresosPost = async (req, res) => {
  const { ...body } = req.body;

  const parts = body.fecha.split('-');
  const fecha = new Date(parts[0], parts[1] - 1, parts[2]); 
  const cuenta = await Cuenta.findById(body.cuenta);
  const categoria = await Categoria.findById(body.categoria);
  
  const data = {
      fecha: fecha,
      nombre: body.nombre,
      valor: body.valor,
      cuenta: cuenta,
      categoria: categoria,
      estado: body.estado,
  };
  const ingreso = new Ingreso(data);

  //Guardar en BD
  await ingreso.save();

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

const ingresosDelete = async(req, res) => {
  const { id } = req.params;
  
  const ingreso = await Ingreso.findById(id);

  await Ingreso.findByIdAndDelete(id);

  res.json({ingreso});

}

module.exports = {
    ingresosGet,
    ingresosGetById,
    ingresosPut,
    ingresosPost,
    ingresosDelete,
};
