const { Router, request } = require("express");
const { check } = require("express-validator");

const {validarCampos,validarJWT} = require('../middlewares');

const { emailExiste, existeUsuarioPorId } = require("../helpers/db-validators");

const {
  usuariosGet,
  usuariosPut,
  usuariosPost,
  usuariosDelete,
} = require("../controllers/usuarios");



const router = Router();

router.get("/",[
  validarJWT,
], usuariosGet);

router.put("/:id",[
  validarJWT,
  check('id', 'No es un ID válido').isMongoId(),
  check('id').custom( existeUsuarioPorId ),
  validarCampos
], usuariosPut);

router.post("/",[
  validarJWT,
  check('nombres', 'nombres es obligatorio').not().isEmpty(),
  check('apellidos', 'apellidos es obligatorio').not().isEmpty(),
  check('usuario', 'usuario es obligatorio').not().isEmpty(),
  check('contrasena', 'La contraseña es obligatoria y más de 6 letras').isLength({min:6}),
  check('correo', 'El correo no es válido').isEmail(),
  check('correo').custom(emailExiste),
  validarCampos
] , usuariosPost);

router.delete("/:id",[
  validarJWT,
  check('id', 'No es un ID válido').isMongoId(),
  check('id').custom( existeUsuarioPorId ),
  validarCampos
], usuariosDelete);

module.exports = router;
