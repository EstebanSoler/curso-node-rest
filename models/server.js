const express = require('express');
const cors = require('cors');
const { socketController } = require('../sockets/controller');

class Server {

  constructor(){
    this.app = express();
    this.port = process.env.PORT;
    this.server = require('http').createServer(this.app);
    this.io = require('socket.io')(this.server);

    this.paths = {}

    //Midedlewares
    this.middleware();
    
    //Rutas de la applicaíon
    this.routes();
  }

  middleware() {

    // CORS
    this.app.use(cors())

    // directorio publico
    this.app.use( express.static('public'));

    // Sockets
    this.sockets();

  }

  routes(){
    //this.app.use( this.paths.auth, require('../routes/auth'));
  }

  sockets(){
    this.io.on("connection", socketController);
  }

  listen() {
    this.server.listen(this.port, () => {
      console.log('Servidor corriendo en puerto: ', this.port);
    });
  }

}

module.exports = Server;