const { response, request } = require("express");
const { Gasto, Categoria, Cuenta } = require("../models");

const gastosGetByUsuario = async (req = request, res = response) => {
  
    const { desde = 0, limite = 5 } = req.query;
    const query = { estado: true };
  
    const [total, gastos] = await Promise.all([
        Gasto.countDocuments(query),
        Gasto.find(query).skip(Number(desde)).limit(Number(limite)),
    ]);
  
    res.json({total, gastos});
};

const gastosGetById = async (req = request, res = response) => {
  
    const { id } = req.params;
    const gasto = await Gasto.findById(id);
  
    res.json({gasto});
};

const gastosPost = async (req, res) => {
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

    const gasto = new Gasto(data);
  
    // Guardar en BD
    await gasto.save();
  
    res.json({gasto});
};

const gastosPut = async (req, res) => {
    const { id } = req.params;
    const usuarioBD = await Gasto.findById(id);
    const { _id, ...resto } = req.body;
  
    await Gasto.findByIdAndUpdate(id, resto);
    const gasto = await Gasto.findById(id);
  
    res.json({gasto});
};

const gastoDelete = async(req, res) => {
    const { id } = req.params;

    const gasto = await Gasto.findById(id);
  
    await Gasto.findByIdAndDelete(id);
  
    res.json({gasto});
    
}
  
module.exports = {
    gastosGetById,
    gastosGetByUsuario,
    gastosPut,
    gastosPost,
    gastoDelete,
};
  