import { Response, Router } from "express";
import { fluxController } from "./App/Controllers/flux.Controller";
import { roomController } from "./App/Controllers/room.Controller";
import { userController } from "./App/Controllers/User.Controller";
const routes: Router = Router();
const flux = new fluxController
const room = new roomController
const user = new userController

routes.post("/register", user.createUser)
routes.post("/login", flux.check)
routes.post("/rooms", room.createRoom)
        
export default routes;
