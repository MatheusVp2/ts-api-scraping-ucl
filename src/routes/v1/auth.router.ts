import { Router } from "express";
import { AuthController } from "../../controller/v1/auth.controller";

const route = Router();

route.get('/auth', (req, res) => { res.json( { message: "Rota de Autenticação Rodando."} ) } )

route.post('/auth', AuthController.post )

export default route;