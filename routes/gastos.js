const { Router, request } = require("express");
const { check } = require("express-validator");

const {validarCampos,validarJWT} = require('../middlewares');

const { existeGastoPorId } = require("../helpers/db-validators");

const {
    gastosGetById,
    gastosGetByUsuario,
    gastosPut,
    gastosPost,
    gastoDelete,
} = require("../controllers/gastos");



const router = Router();

router.get("/",[
  validarJWT,
], gastosGetByUsuario);

router.get("/:id",[
  validarJWT,
  check('id', 'No es un ID válido').isMongoId(),
  check('id').custom( existeGastoPorId ),
  validarCampos
], gastosGetById);

router.put("/:id",[
  validarJWT,
  check('id', 'No es un ID válido').isMongoId(),
  check('id').custom( existeGastoPorId ),
  validarCampos
], gastosPut);

router.post("/",[
  // validarJWT,
  check('fecha', 'fecha es obligatorio').not().isEmpty(),
  check('nombre', 'nombre es obligatorio').not().isEmpty(),
  check('valor', 'valor es obligatorio').not().isEmpty(),
  check('cuenta', 'cuenta es obligatorio').not().isEmpty(),
  check('categoria', 'categoria es obligatorio').not().isEmpty(),
  check('usuario', 'usuario es obligatorio').not().isEmpty(),
  check('id').custom(existeGastoPorId),
  validarCampos
] , gastosPost);

router.delete("/:id",[
  validarJWT,
  check('id', 'No es un ID válido').isMongoId(),
  check('id').custom( existeGastoPorId ),
  validarCampos
], gastoDelete);

module.exports = router;
