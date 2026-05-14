const express = require('express');
const path = require('path');
const http = require('http');
const {Server} = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {origin: "*"}
});

app.use(express.static(path.join(__dirname, 'build')));
let activeSessions = 0;

io.on('connection', (socket) => {
    activeSessions++;
    io.emit('activeSessions', activeSessions);

    socket.on('disconnect', () => {
        activeSessions--;
        io.emit('activeSessions', activeSessions);
    });
})

app.get(/^(?!\/api).+/, (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
