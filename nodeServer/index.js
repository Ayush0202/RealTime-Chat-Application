// Node Server which will handle Socket.io connections

const io = require('socket.io')(8000, {
    cors: {
      origin: '*',
    }
  });

const users = {};

io.on('connection', socket => {
    
    //Let other users connected in server know if a new user joins!
    socket.on('new-user-joined', name => {
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name); 
    });

    //If someone sends a message, broadcast it to all the users
    socket.on('send', message =>{
        socket.broadcast.emit('receive', {message: message, name: users[socket.id]})
    });

    //Let other users in server know if a user leaves the chat!
    socket.on('disconnect', message =>{
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
    });

});