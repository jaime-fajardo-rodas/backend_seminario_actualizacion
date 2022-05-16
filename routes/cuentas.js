const { Router, request } = require("express");
const { check } = require("express-validator");

const {validarCampos,validarJWT} = require('../middlewares');

//const { emailExiste, existeUsuarioPorId } = require("../helpers/db-validators");
const { emailExiste, existeCuentaPorId } = require("../helpers/db-validators");

const {
  cuentasGet,
  cuentasGetById,
  cuentasPut,
  cuentasPost,
  cuentasDelete,
} = require("../controllers/cuentas");


const router = Router();

router.get("/",[
  validarJWT,
], cuentasGet);

router.get("/:id",[
  validarJWT,
  check('id', 'No es un ID válido').isMongoId(),
  //check('id').custom( existeCuentaPorId ),
  validarCampos
], cuentasGetById);

router.put("/:id",[
  validarJWT,
  check('id', 'No es un ID válido').isMongoId(),
  //check('id').custom( existeCuentaPorId ),
  validarCampos
], cuentasPut);

router.post("/",[
  validarJWT,
  check('cuentaBanco', 'Cuenta de banco es obligatorio').not().isEmpty(),
  check('saldo', 'saldo es obligatorio').not().isEmpty(),
  check('tipoCuenta', 'El tipo de cuenta es obligatoria').not().isEmpty(),
  check('usuario', 'Usuario es obligatoria').not().isEmpty(),  
  validarCampos
] , cuentasPost);

router.delete("/:id",[
  validarJWT,
  check('id', 'No es un ID válido').isMongoId(),
  //check('id').custom( existeCuentaPorId ),
  validarCampos
], cuentasDelete);

module.exports = router;
