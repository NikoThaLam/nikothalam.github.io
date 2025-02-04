// server.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files from the public directory
app.use(express.static('public'));

let users = {}; // Store usernames

io.on('connection', (socket) => {
    console.log('A user connected');

    // Handle username assignment
    socket.on('setUsername', (username) => {
        if (!users[socket.id]) { // Allow setting username only if not already set
            users[socket.id] = username;
            socket.emit('userSet', { username: username });
        }
    });

    // Handle message sending
    socket.on('chatMessage', (msg) => {
        const username = users[socket.id] || 'Anonymous';
        io.emit('chatMessage', { username: username, message: msg });
    });

    socket.on('disconnect', () => {
        console.log('User  disconnected');
        delete users[socket.id]; // Remove user on disconnect
    });
});

server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});