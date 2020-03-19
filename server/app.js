const express = require("express");
const app = express();
const PORT = 3000;
const http = require("http").createServer(app);
const io = require("socket.io")(http);

io.on("connection", socket => {
  console.log("ADA YG MASUK");
  socket.on("disconnect", () => {
    console.log("ADA YG KELUAR");
  });
});
app.get("/", function(req, res) {
  res.send("<h1>Hello world</h1>");
});

http.listen(3000, function() {
  console.log("listening on *:3000");
});
