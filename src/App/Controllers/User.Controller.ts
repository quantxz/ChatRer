import { Request, Response } from "express";
import { userModel } from "../Models/Users";


class userController {
    public async createUser(req: Request, res: Response) {
        const { ...data } = req.body; 

        await userModel(data)
    }
}

export default new userController