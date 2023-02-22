const Client = require("./entity/client");
var clientManager = require("./client-manager");
var io = require("socket.io");
// var server = io.listen(5000);
// console.log("server started ...");

var socketServer = require("./socket-server");
var server = socketServer.start(5000);

// listen to connection

// server.on("connection", (socket) => {
server.on("connection", (socket) => {
  socket.on("client:info", (data) => {
    socket.join(data.roomId);
    socket.to(data.roomId).to(socket.id).emit("client-connected", data.name);
    onClient(data);
  });
  // send message to room or send a client if room = socketid
  socket.on("send-message-to-room", (data) => {
    socket.to(data.roomId).to(socket.id).emit("message-receive", {
      message: data.message,
      name: data.name,
      socketId: data.socketId,
    });
  });

  // listen to disconnection
  socket.on("disconnect", () => {
    let userDisconnected = clientManager.getClientBySocket(socket.id);
    if (userDisconnected == null) return;
    socket
      .to(userDisconnected.room)
      .emit("user-disconnected", userDisconnected);
    onDisconnect();
  });

  function onClient(data) {
    var client = new Client(data.name, data.id, data.roomId, data.time);
    clientManager.add(data.id, client);
    console.log(clientManager.getAll());
  }

  // send msg to all client in room
  function onRoomMessage(data) {}

  function onDisconnect() {
    clientManager.remove(socket.id);
    console.log(clientManager.getAll());
    // console.log(server.engine.clients);
  }
});
