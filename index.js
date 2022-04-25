const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const cors = require("cors");
const whitelist = ["https://www.google.com/"];

app.use(
  cors({
    origin: whitelist,
  })
);

app.get("/", function (req, res) {
  res.sendfile("index.html");
});

//Whenever someone connects this gets executed
io.on("connection", function (socket) {
  console.log("A user connected");

  //Whenever someone disconnects this piece of code executed
  io.emit("new_message", {
    testing: "iya hanya testing",
  });
  socket.on("disconnect", function () {
    console.log("A user disconnected");
  });
});

app.get("/test", cors(), function (req, res) {
  io.emit("new_message", "world");
  res.send(true);
});

http.listen(3000, function () {
  console.log("listening on *:3000");
});
