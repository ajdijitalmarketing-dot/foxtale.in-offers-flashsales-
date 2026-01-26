const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

app.use(express.static("public"));

io.on("connection", socket => {

  socket.on("join-room", roomId => {
    socket.join(roomId);
  });

  socket.on("send-location", data => {
    socket.to(data.roomId).emit("receive-location", data);
  });

});

http.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
