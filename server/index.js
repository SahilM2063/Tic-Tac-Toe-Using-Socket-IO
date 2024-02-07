const { createServer } = require("http");
const { Server } = require("socket.io");

const httpServer = createServer();
const io = new Server(httpServer, { cors: "http://localhost:5173" });

const allUsers = [];

io.on("connection", (socket) => {
    allUsers.push({
        socket: socket,
        online: true
    })
    console.log(`New Player joined with id : ${socket.id}`)

    socket.on("disconnect", () => {
        for (let i = 0; i < allUsers.length; i++) {
            const user = allUsers[i]
            if (user.socket.id === socket.id) {
                user.online = false
            }
        }
    })
});

const port = 6969

httpServer.listen(port, () => {
    console.log(`Server running on Port : ${port}`)
});