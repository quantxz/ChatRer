import { Request, Response } from "express";
import { createUser as UserCreation } from "../Models/Users";
import { chatData } from "../../types/genericsInterfaces";
import { createRooms } from "../Models/Room";
import { userDto } from "../../types/DTO/User.dto";
import { roomsDto } from "../../types/DTO/rooms.dto";
import { MostPopularRooms } from "../Models/mostVisitedsRooms";
import { checkEmail, checkNickname, checkPassword } from "../Models/RegisterCheck";

export class userController {
       
    async createUser(req: Request, res: Response): Promise<void> {
        
        const { name, email, password } = req.body;
        
        const userDto: userDto = {
            name: name,
            email: email,
            password: password
        }
        
        const popularRooms = await MostPopularRooms()

        const userAndRooms = [
            userDto,
            popularRooms
        ]

        const nameExists: boolean = await checkNickname(userDto.name)
        const emailExists: boolean = await checkEmail(userDto.email)
        const passwordExists: boolean = await checkPassword(userDto.password)
        
        if(nameExists || emailExists || passwordExists) {
            res.render("loginFail.ejs", { message: "Some of the fields are already being used by another user" });
        } else {
            await UserCreation(userDto);
            res.render("menu.ejs", { userAndRooms });
        }
             
        

        

        

        res.render("menu.ejs", {userAndRooms})
        
    }      
}