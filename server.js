var io = require('socket.io').listen(3000);
io.sockets.on('connection', function(socket) {
  socket.on('chat_message', function(data) {
    var bot_reply =  data + 'だボット';
    io.sockets.emit('msg', bot_reply);
  });
});
