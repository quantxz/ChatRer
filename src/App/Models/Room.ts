import { PrismaClient, Rooms, Users } from "@prisma/client";
import { Response } from "express"
import { chatData } from "../../types/genericsInterfaces";

const prisma = new PrismaClient();

export const createRooms = async (data: chatData): Promise<Rooms | ((res: Response) => void)> => {
    
    const room = await prisma.rooms.findFirst({
        where: {
            name: data.room
        }
    })

    if (room) {
        return (res: Response) => {
            res.render("chat.ejs", data)
        }
    } else {
        const Room = await prisma.rooms.create({
            data: {
                name: data.room
            }
        })
        return Room
    }

    return room
}   