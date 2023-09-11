import { PrismaClient, Rooms, Users } from "@prisma/client"

const prisma = new PrismaClient()

export const findUser = async (data: any): Promise<Users> => {
    const user = await prisma.users.findUnique({
        where: {
            name: data.name 
        }
    })

    return user;
}

export const findRoom = async (data: Rooms): Promise<Rooms> => {
    const room = await prisma.rooms.findUnique({
        where: {
            name: data.name
        }
    }) 

    return room;
}