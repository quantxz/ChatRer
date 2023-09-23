import { PrismaClient, rooms } from "@prisma/client";
import { Response } from "express"
import { roomsDto } from "../../types/DTO/rooms.dto";

const prisma = new PrismaClient();

export const createRooms = async (data: roomsDto): Promise<rooms | ((res: Response) => void)> => {
    
    const room = await prisma.rooms.findFirst({
        where: {
            name: data.name
        }
    })

    if (room) {
        return (res: Response) => {
            res.render("chat.ejs", data)
        }
    } else {
        const Room = await prisma.rooms.create({
            data: {
                name: data.name
            }
        })
        return Room
    }

    return room
}   