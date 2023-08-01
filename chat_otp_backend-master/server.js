const express = require("express");
const mongoose = require("mongoose");
const router = require("./routes/auth");
const app = express()
const cors = require("cors")
const server = require('http').createServer(app);

var io = require('socket.io')(server, {
    cors: {
        origin: '*',
    }
});

app.use(cors())
app.use(express.json())
app.use("/api/", router)
mongoose.connect("mongodb://localhost:27017/messanger").then(() => {
    console.log("Mongodb connected")
}).catch((error) => {
    console.log("error while starting server", error)
})
let user = [];
io.on('connection', (socket) => {
    socket.on("joined", (data) => {
        let userExit = user.find(res => res.phone === data.phone)
        if (!userExit) {
            user.push(data)
        }
        let filterUser = user.filter((res) => res.phone !== data.phone)
        io.emit("user_connect", filterUser)
        socket.join(data.phone);
    })
    socket.on("message", (data) => {
        socket.to(data.reciver).emit("reciveMessage", data);
    })
    socket.on("disconnect:socket", (data) => {
        user = user.filter((res) => res?.phone !== data?.phone)
        io.emit("user_connect", user)

    })
})
app.get("/", (req, res) => {
    res.send("respone send")
})
server.listen(4000, () => {
    console.log("server is running on 4000")
})