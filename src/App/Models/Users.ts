import { PrismaClient, Users } from "@prisma/client";
import { User } from "../../types/userType";
const prisma = new PrismaClient();

export const createUser = async (data: Users): Promise<Users> => {
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

export const userRoomUpdate = async (data: any) => {
    await prisma.users.update({
        data: {
            roomsn: data.roomName
        },
        where: {
            name: data.userName
        }
    })
}