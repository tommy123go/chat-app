class Client {
  constructor(name, socketId, room, time) {
    this.name = name;
    this.socketId = socketId;
    this.room = room;
    this.createdTime = time;
  }

  getInfo() {
    return {
      name: this.name,
      room: this.room,
      socketId: this.socketId,
      createdTime: this.createdTime,
    };
  }
  setInfo(name, socketId, room, time) {
    this.name = name;
    this.socketId = socketId;
    this.room = room;
    this.createdTime = time;
    return this;
  }
}

module.exports = Client;
