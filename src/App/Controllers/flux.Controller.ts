import { Request, Response } from "express";
import { prisma } from "../../types/prisma";
import { userDto } from "../../types/DTO/User.dto";
import { MostPopularRooms } from "../Models/mostVisitedsRooms";

export class fluxController {
    async check(req: Request, res: Response): Promise<Response | void> {
        const { name, password } = req.body;
 
        const userDto: userDto = { 
            name: name, 
            password: password,
            email: "" 
        };

        const popularRooms = await MostPopularRooms()

        const userAndRooms = [
            userDto,
            popularRooms
        ];

        if(name == "Guest" && password == "Pass") {
            res.render("menu.ejs", { userAndRooms })
        } else {
            const user = await prisma.users.findFirst({
                where: {
                    name: name,
                    password: password
                }
            });

            if (user) {
                res.render("menu.ejs", { userAndRooms })
            } else {
                res.render("loginFail.ejs", { message: "this user not exists" })
            };
        }
    }
}