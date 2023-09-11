import { Request, Response } from "express";
import { createUser as UserCreation } from "../Models/Users";
import { PrismaClient, Users } from "@prisma/client";
import { chatData, loginData } from "../../types/genericsInterfaces";
import { createRooms } from "../Models/Room";
import { findUser } from "../Models/find";

const prisma = new PrismaClient();

class userController {

    async check(req: Request, res: Response): Promise<Response> {
        const { name, password } = req.body;

        const data: loginData = { name: name, password: password};

        const user = await prisma.users.findFirst({
            where: {
                name: name,
                password: password
            }
        });

        if (user) {
            res.render("menu.ejs", data)
        } else {
            return res.json({
                message: "this user no exists"
            })
        };

    }
    
    async createUser(req: Request, res: Response): Promise<void> {
        
        const { name, email, password } = req.body;
        
        const data = {
            name: name,
            email: email,
            password: password
        } as Users

        await UserCreation(data)

        res.render("menu.ejs", data)
        
    }      
    
    async createRoom(req: Request, res: Response): Promise<void> {
        const { roomName: name, userName: user  } = req.body;

        const data = {
            room: name,
            user: user
        } as chatData

        await createRooms(data)
        
        res.render("chat.ejs", data)
            
    }      
}
  
export default new userController