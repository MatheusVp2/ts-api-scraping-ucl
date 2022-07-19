import { Router } from "express";
import { AuthController } from "../../controller/v1/auth.controller";

const route = Router();

route.post('/auth', AuthController.post )

export default route;