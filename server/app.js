const express = require("express");
const app = express();
const PORT = 3000;
const http = require("http").createServer(app);
const io = require("socket.io")(http);
let player = 0;

io.on("connection", socket => {
  player++;
  socket.on("disconnect", () => {
    player--;
    console.log("ADA YG KELUAR");
  });
  socket.on("playerAttack", data => {
    socket.broadcast.emit("afterAttack", data);
  });
  console.log("ADA YG MASUK ", player);
});

http.listen(PORT, function() {
  console.log(`listening on *:${PORT}`);
});
