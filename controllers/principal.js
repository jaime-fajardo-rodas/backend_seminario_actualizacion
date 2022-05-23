const { response, request } = require("express");
const { Ingreso, Gasto } = require("../models/");

const principalGet = async (req = request, res = response) => {

  const [ sumaIngresos, sumaGastos ] = await Promise.all([

    Ingreso.aggregate([
      {
        $match: { estado: true }
      },
      {
        $group: {
          _id: null,
          sumatoriaIngresos: { $sum: '$valor' }
        }
      }]),
    Gasto.aggregate([
      {
        $match: { estado: true }
      },
      {
        $group: {
          _id: null,
          sumatoriaGastos: { $sum: '$valor' }
        }
      }]),

  ]);

  const {sumatoriaIngresos = 0} = (sumaIngresos.length > 0) ? sumaIngresos[0] : 0;
  const {sumatoriaGastos = 0} = (sumaGastos.length > 0) ? sumaGastos[0] : 0;

  res.json({
    sumatoriaIngresos,
    sumatoriaGastos,
  });
};



module.exports = {
  principalGet,
};
