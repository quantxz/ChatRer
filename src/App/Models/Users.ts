import { PrismaClient, users } from "@prisma/client";
import { userDto } from "../../types/DTO/User.dto";
const prisma = new PrismaClient();

export const createUser = async (data: userDto): Promise<users> => {
        const user = await prisma.users.create({ 
            data: { 
                name:       data.name,
                email:      data.email,
                password:   data.password
            } 
        });

        console.log("Novo usuário criado: ", user);

        return user;
}

export const userRoomUpdate = async (data: any): Promise<users> => {
    const userRoom = await prisma.users.update({
        data: {
            roomsn: data.roomName
        },
        where: {
            name: data.userName
        }
    })

    return userRoom
}