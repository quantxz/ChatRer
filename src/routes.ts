import { Response, Router } from "express";
import UserController from "./App/Controllers/User.Controller";
const routes: Router = Router();

routes.post("/register", UserController.createUser)
routes.post("/login", UserController.check)
routes.post("/rooms", UserController.createRoom)
        
export default routes;
