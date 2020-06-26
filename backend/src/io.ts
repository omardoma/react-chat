import io from 'socket.io';

const instance = io();

instance.on('connection', (socket: io.Socket) => {
  socket.join('chat', err => {
    if (err) {
      return socket.disconnect(true);
    }
    socket.on('message', message => {
      socket.to('chat').emit('message', message);
    });
  });
});

export default instance;
