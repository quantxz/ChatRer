import { Router } from "express";
import UserController from "./App/Controllers/User.Controller";
const routes: Router = Router();

routes.post("/register", UserController.createUser)

export default routes;
