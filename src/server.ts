import { io, httpServidor  } from "./app";

io.on('connection', (socket: any) => {
  console.log(`Client ${socket.id} connected`);

  socket.on('sendMessage', (msg: any) => {
    console.log(msg)
    socket.broadcast.emit('ReceivedMessage', msg);
  })

});




























httpServidor.listen(5667, () => {
  console.log(`Rodando na porta ${5667}`);
});