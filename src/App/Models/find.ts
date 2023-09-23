import { PrismaClient, rooms, users } from "@prisma/client"
import { roomsDto } from "../../types/DTO/rooms.dto";
import { userDto } from "../../types/DTO/User.dto";

const prisma = new PrismaClient()

export const findUser = async (data: any): Promise<users> => {
    const user = await prisma.users.findUnique({
        where: {
            name: data.name 
        }
    })

    return user;
}

export const findRoom = async (data: roomsDto): Promise<rooms> => {
    const room = await prisma.rooms.findUnique({
        where: {
            name: data.name
        }
    }) 

    return room;
}