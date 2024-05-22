const { Server } = require("socket.io")

const io = new Server(8000, {
    cors: true,
});

const usernameToSocketidMap = new Map()
const socketToUsernameMap = new Map()    

io.on("connection", (socket) => {
    console.log(`Socket connected`, socket.id);
    socket.on("room:join", (data) => {
        const { username, room } = data 
        usernameToSocketidMap.set(username, socket.id)
        socketToUsernameMap.set(socket.id, username)
        io.to(socket.id).emit("room:join", data)
    })
});