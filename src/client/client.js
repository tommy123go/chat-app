var socket = io("ws://localhost:5000", { transports: ["websocket"] });

const joinBtn = document.getElementById("join-btn");
const exitBtn = document.getElementById("exit-btn");
const userForm = document.getElementById("user-container");
const userName = document.getElementById("name");
const room = document.getElementById("room");
const messageForm = document.getElementById("send-container");
const messageInput = document.getElementById("message-input");
const messageContainer = document.getElementById("message-container");

socket.on("connect", function () {
  userForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const time = new Date();
    const name = userName.value;
    const roomId = room.value;

    // Send User Info to Sever
    if (name == "" || roomId == "") {
      appendMessage("Vui long dien du thong tin");
    } else {
      joinBtn.disabled = true;
      exitBtn.disabled = false;
      appendMessage(`You connected with ID: ${socket.id}`);

      socket.emit("client:info", {
        name: name,
        roomId: roomId,
        time: time,
        id: socket.id,
      });

      // Listen to user connecting
      socket.on("client-connected", function (name) {
        appendMessage(`${name} CONNECTED!`);
      });

      // Send message to Server
      messageForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const message = messageInput.value;
        if (message == "") {
        } else {
          socket.emit("send-message-to-room", {
            name: name,
            message: message,
            socketId: socket.id,
            roomId: roomId,
          });
          appendMessage(`You: ${message}`);
          messageInput.value = "";
        }
      });

      // Display message
      socket.on("message-receive", function (data) {
        appendMessage(`${data.name}: ${data.message}`);
      });

      // Display disconnection
      socket.on("user-disconnected", function (user) {
        appendMessage(`${user.name} DISCONNECTED!`);
      });
    }
  });
});

// Append message to chatboxx
function appendMessage(message) {
  const messageElement = document.createElement("div");
  messageElement.innerText = message;
  messageContainer.append(messageElement);
}
