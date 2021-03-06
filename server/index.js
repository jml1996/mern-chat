const express = require('express');
const app = express();
const http = require('http').Server(app);

const path = require('path');
const io = require('socket.io')(http);
// const io = require('socket.io')(http, {
//     cors: {
//     origin: "https://vast-spire-64473.herokuapp.com/",
//     methods: ["GET", "POST"]
//     }
// });


// const server2 = require("./api/server")

require('dotenv').config()


const uri = process.env.MONGODB_URI || "mongodb+srv://jml1996:lfS7jlSfgcELkkau@cluster0.efwqd.mongodb.net/mern_chat_db_name?retryWrites=true&w=majority";
// const uri = process.env.MONGODB_URI;
const port = process.env.PORT || 5000;
const port2 = process.env.PORT + 1 || 3000 || 8080 || 8000 || 3001 || 5001 || 8001;

// console.log(uri);

const Message = require('./Message');
const mongoose = require('mongoose');

mongoose.connect(uri, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

app.use(express.static(path.join(__dirname, '..', 'client', 'build')));

io.on('connection', (socket) => {
  // Get the last 10 messages from the database.
  Message.find().sort({createdAt: -1}).limit(10).exec((err, messages) => {
    if (err) return console.error(err);

    // Send the last messages to the user.
    socket.emit('init', messages);
  });

  // Listen to connected users for a new message.
  socket.on('message', (msg) => {
    // Create a message with the content and the name of the user.
    const message = new Message({
      content: msg.content,
      name: msg.name,
    });

    // Save the message to the database.
    message.save((err) => {
      if (err) return console.error(err);
    });

    // Notify all other users about a new message.
    socket.broadcast.emit('push', msg);
  });
});

http.listen(port, () => {
  console.log('listening on *:' + port);
});

// server2.listen(port2, () => {
//     console.log(`Server is running on ${port2}`)
// })