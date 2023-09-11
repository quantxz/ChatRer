import { Messages, Prisma, PrismaClient, Rooms } from "@prisma/client";
import { userRoomUpdate } from "./App/Models/Users";
import { findRoom, findUser } from "./App/Models/find";
import { io, httpServidor  } from "./app";
import { chatData, messageData } from "./types/genericsInterfaces";

const users: any[] = []

const prisma = new PrismaClient();

io.on('connection', (socket: any) => {

  socket.on("select_room", async (data: chatData): Promise<void> => {
    
    socket.join(data.room);
      const user = await findUser({name: data.user})
      const room = await findRoom({name: data.room})

      const userInRoom = users.find(user => user.user === data.user && user.room === data.room)

      if (userInRoom) {
        userInRoom.socket_id = socket.id
      } else {


          users.push({
            room: room,
            user: user,
            socket_id: socket.id
          })
      }

      const messagesOfRoom = await getMessages(data.room);
      socket.emit("room_messages", messagesOfRoom);
    })

  socket.on("message", async (data: messageData): Promise<void> => {

      const message = await prisma.messages.create({
          data: {
            author: data.user,
            message: data.message,
            roomName: data.room
          }
      })

      io.to(data.room).emit("message", {message: message, user: data.user})

  })

});


const getMessages = async (roomName: string): Promise<Messages[]> => {
  const message = await prisma.messages.findMany({
    where: {
      roomName: roomName
    }
  });

  return message
}















httpServidor.listen(5667, () => {
  console.log(`Rodando na porta ${5667}`);
});