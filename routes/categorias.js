const { Router, request } = require("express");
const { check } = require("express-validator");

const {validarCampos,validarJWT} = require('../middlewares');
//const { emailExiste, existeUsuarioPorId } = require("../helpers/db-validators");
const { emailExiste, existeCategoriaPorId } = require("../helpers/db-validators");

const {
  categoriasGet,
  categoriasGetById,
  categoriasPut,
  categoriasPost,
  categoriasDelete,
} = require("../controllers/categorias");



const router = Router();

router.get("/",[
  validarJWT,
], categoriasGet);

router.get("/:id",[
  validarJWT,
  check('id', 'No es un ID válido').isMongoId(),
   //check('id').custom( existeCategoriaPorId ),
  validarCampos
], categoriasGetById );

router.put("/:id",[
  validarJWT,
  check('id', 'No es un ID válido').isMongoId(),
   //check('id').custom( existeCategoriaPorId ),
  validarCampos
], categoriasPut);

router.post("/",[
  validarJWT,
  check('nombres', 'nombres es obligatorio').not().isEmpty(),
  check('tipo_categoria', 'tipo_categoria es obligatorio').not().isEmpty(),
  validarCampos
] , categoriasPost);

router.delete("/:id",[
  validarJWT,
  check('id', 'No es un ID válido').isMongoId(),
   //check('id').custom( existeCategoriaPorId ),
  validarCampos
], categoriasDelete);

module.exports = router;
