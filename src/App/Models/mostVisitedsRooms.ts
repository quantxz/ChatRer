import { rooms } from "@prisma/client";
import { prisma } from "../../types/prisma";

export async function MostPopularRooms(): Promise<any[number]> {
    const roomWithMaxVisits: rooms[] = await prisma.rooms.findMany({
      orderBy: {
        visits: 'desc' // Ordena por visitas em ordem decrescente
      }
    });
    const mostPopularRooms = []

    if(roomWithMaxVisits.length > 4) {
      for(let i = 0; i <= 4; i++) {
        mostPopularRooms.push(roomWithMaxVisits[i])
      }
    } else {
     mostPopularRooms.push(roomWithMaxVisits)
    }
  
    return mostPopularRooms[0]
}
