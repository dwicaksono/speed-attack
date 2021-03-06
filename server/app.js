require('dotenv').config()
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000
const http = require("http").createServer(app);
const io = require("socket.io")(http);
let player = 0;
const cors = require('cors')

app.use(cors())

io.on("connection", socket => {
  player++;
  socket.on("disconnect", () => {
    player--;
    console.log("ADA YG KELUAR");
  });
  socket.on("playerAttack", (data) => {
    socket.broadcast.emit("afterAttack", data);
  });
  socket.on('addPlayer', username => {
    socket.broadcast.emit('addPlayer', username)
  })
  console.log("ADA YG MASUK ", player);
});

http.listen(PORT, function() {
  console.log(`listening on *:${PORT}`);
});
