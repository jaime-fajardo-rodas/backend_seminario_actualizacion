const { Router, request } = require("express");
const { check } = require("express-validator");
const helmet = require("helmet");

const {validarCampos,validarJWT} = require('../middlewares');

const { existeIngresoPorId, existeCuentaPorId, existeCategoriaPorId } = require("../helpers/db-validators");

const {
   ingresosGet,
   ingresosGetById,
   ingresosPut,
   ingresosPost,
   ingresosDelete,
} = require("../controllers/ingresos");

const router = Router();
router.use(helmet.hidePoweredBy());

router.get("/",[
  validarJWT,
], ingresosGet); 

router.get("/:id",[
  validarJWT,
  check('id', 'No es un ID válido').isMongoId(),
  check('id').custom( existeIngresoPorId ),
  validarCampos
], ingresosGetById);

router.put("/:id",[
  validarJWT,
  check('id', 'No es un ID válido').isMongoId(),
  validarCampos
], ingresosPut);

router.post("/",[
  validarJWT,
  check('fecha', 'Fecha es obligatoria').not().isEmpty(),
  check('nombre', 'nombre es obligatorio').not().isEmpty(),
  check('valor', 'valor es obligatorio').not().isEmpty(),
  validarCampos
] , ingresosPost);

router.delete("/:id",[
  validarJWT,
  check('id', 'No es un ID válido').isMongoId(),
  //check('id').custom( existeUsuarioPorId ),
  validarCampos
], ingresosDelete);

module.exports = router;
