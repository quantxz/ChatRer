import { Request, Response } from "express";
import { roomsDto } from "../../types/DTO/rooms.dto";
import { createRooms } from "../Models/Room";

export class roomController {
    async createRoom(req: Request, res: Response): Promise<void> {
        const { roomName: name, userName: user  } = req.body;

        const roomDto: roomsDto = {
            name: name,
            userName: user
        }

        await createRooms(roomDto)
        
        res.render("chat.ejs", { roomDto })
            
    }      
}