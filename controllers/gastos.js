const { response, request } = require("express");
const Gasto = require("../models/gasto");

const gastosGetByUsuario = async (req = request, res = response) => {
  
    const { usuario } = req.params;
    const { desde = 0, limite = 5 } = req.query;
  
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

const gastosPut = async (req, res) => {
    const { id } = req.params;  
    const { _id, ...resto } = req.body;
  
    await Gasto.findByIdAndUpdate(id, resto);
    const gasto = await Gasto.findById(id);
  
    res.json({gasto});
};

const gastosPost = async (req, res) => {
    const { cuenta, categoria, ...body } = req.body;

    const data = {
        fecha: body.fecha,
        nombre: body.nombre,
        valor: body.valor,
        cuenta: cuenta._id,
        categoria: categoria._id,
        estado: body.estado,
    };

    const gasto = new Gasto(data);
  
    //Guardar en BD
    await gasto.save();
  
    res.json({gasto});
};

const gastoDelete = async(req, res) => {
    const { id } = req.params;
    const { borrar_permanente } = req.body;
  
    await Gasto.findByIdAndUpdate( id, {estado:false} );
    const gasto = await Usuario.findById(id);
  
    if(borrar_permanente === true){
      await Gasto.findByIdAndDelete(id);
    }
  
    res.json({gasto});

}
  
module.exports = {
    gastosGetById,
    gastosGetByUsuario,
    gastosPut,
    gastosPost,
    gastoDelete,
};
  