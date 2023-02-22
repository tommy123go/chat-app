function SocketServer() {
  var io = require("socket.io");
  console.log(io);
  this.start = function (port) {
    let server = io.listen(port);
    console.log("server started ...");
    return server;
  };

  this.on = function (event, callbackFn) {
    callbackFn();
  };
}

module.exports = new SocketServer();
