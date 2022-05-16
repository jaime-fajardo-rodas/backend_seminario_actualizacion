const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../database/config");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.paths = {
      auth:       "/api/auth",
      usuarios:   "/api/usuarios",


      gastos:   "/api/gastos",
    };

    //Conectar a base de datos
    this.conectarDB();

    //Middlewares
    this.middlewares();

    //rutas de mi app
    this.routes();
  }

  async conectarDB() {
    await dbConnection();
  }

  middlewares() {
    //CORS
    this.app.use(cors());

    //Lectura y Parseo del Body (lo que llega por parametros en la petición)
    //lo intenta serializar a Json de una
    this.app.use(express.json());

    //directorio publico
    this.app.use(express.static("public"));

  }

  routes() {
    this.app.use(this.paths.auth, require("../routes/auth"));
    this.app.use(this.paths.usuarios, require("../routes/usuarios"));


    this.app.use(this.paths.gastos, require("../routes/gastos"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("servidor corriendo en puerto: ", this.port);
    });
  }
}

module.exports = Server;
