const { Router, request } = require("express");

const {validarJWT} = require('../middlewares');

const {
  principalGet,
} = require("../controllers/principal");

const router = Router();

router.get("/",[
  validarJWT,
], principalGet);

module.exports = router;
