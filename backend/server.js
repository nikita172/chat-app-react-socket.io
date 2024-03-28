const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors")
const colors = require("colors");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");

const { notFound, errorHandler } = require("./middleware/errorMiddleware");
dotenv.config();
connectDB();
const app = express();
app.use(express.json());
app.use(cors());
const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("hello")
})
app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

app.use(notFound);
app.use(errorHandler);

const server = app.listen(port,
  console.log(`app is listening to ${port}`.red.bold)
);

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "https://rainbow-cassata-9a2024.netlify.app"
  }
})

io.on("connection", (socket) => {
  console.log("connected to socket.io")

  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connected");
  })

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("user joined room" + room)

  })
  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));
  socket.on("new message", (newMessageReceived) => {
    console.log(newMessageReceived)
    var chat = newMessageReceived.chat;

    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach(user => {
      if (user._id == newMessageReceived.sender._id) return;
      socket.in(user._id).emit("message received", newMessageReceived)
    })
  })
  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(userData._id);
  });
})