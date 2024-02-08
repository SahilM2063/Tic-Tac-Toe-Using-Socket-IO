const { createServer } = require("http");
const { Server } = require("socket.io");

const httpServer = createServer();
const io = new Server(httpServer, { cors: "*" });

const allUsers = {};
const allRooms = [];

io.on("connection", (socket) => {
    allUsers[socket.id] = {
        socket: socket,
        online: true
    };
    console.log(`New Player joined with id : ${socket.id}`)

    socket.on("request_to_play", (data) => {
        const currentPlayer = allUsers[socket.id]
        currentPlayer.playerName = data.playerName;

        let opponentPlayer;

        for (const key in allUsers) {
            const user = allUsers[key];
            if (user.online && !user.playing && socket.id !== key) {
                opponentPlayer = user
                break;
            }
        }

        if (opponentPlayer) {
            allRooms.push({
                player1: currentPlayer,
                player2: opponentPlayer,
            })

            currentPlayer.socket.emit("opponent_found", {
                opponentName: opponentPlayer.playerName,
                playingAs: "circle"
            })
            opponentPlayer.socket.emit("opponent_found", {
                opponentName: currentPlayer.playerName,
                playingAs: "cross"
            })

            currentPlayer.socket.on("player_move_from_client", (data) => {
                opponentPlayer.socket.emit("player_move_from_server", {
                    ...data
                })
            })
            opponentPlayer.socket.on("player_move_from_client", (data) => {
                currentPlayer.socket.emit("player_move_from_server", {
                    ...data
                })
            })
        } else {
            currentPlayer.socket.emit("opponent_Not_Found")
        }

        // console.log(opponentPlayer)
    })

    socket.on("disconnect", () => {
        const currentPlayer = allUsers[socket.id]
        currentPlayer.online = false
        currentPlayer.playing = false

        for (let i = 0; i < allRooms.length; i++) {
            const { player1, player2 } = allRooms[i];

            if (player1.socket.id === socket.id) {
                player2.socket.emit("player_disconnected")
                break;
            }
            if (player2.socket.id === socket.id) {
                player1.socket.emit("player_disconnected")
                break;
            }
        }
    })
});

const port = 6969

httpServer.listen(port, () => {
    console.log(`Server running on Port : ${port}`)
});
