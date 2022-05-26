const { Router, request } = require("express");
const helmet = require("helmet");
const {validarJWT} = require('../middlewares');

const {
  principalGet,
} = require("../controllers/principal");

const router = Router();
router.use(helmet.hidePoweredBy());

router.get("/",[
  validarJWT,
], principalGet);

module.exports = router;
