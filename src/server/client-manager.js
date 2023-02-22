class ClientManager {
  static userList = {};

  // add client
  static add(key, value) {
    this.userList[key] = value;
  }
  // remove client
  static remove(key) {
    delete this.userList[key];
  }
  // get all clients
  static getAll() {
    return Object.values(this.userList);
  }
  // get client by id = socket.id
  static getClientBySocket(key) {
    return this.userList[key];
  }
  // get client by room
  static getClientByRoom(room) {
    return Object.values(this.userList).filter((item) => (item.room = room));
  }
  // get client by name
  static getClientByRoom(name) {
    return Object.values(this.userList).filter((item) => (item.name = name));
  }
}

module.exports = ClientManager;
