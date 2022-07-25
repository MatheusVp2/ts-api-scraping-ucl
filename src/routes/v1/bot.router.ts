import { Router } from "express";

import { BotController } from './../../controller/v1/bot.controller';

const route = Router();

const controller = new BotController();

route.get('/bot', (req, res) => { res.json({message: "Rota do Bot Rodando."}) })

route.post('/bot/register', controller.register )
route.post('/bot/login', controller.login )
route.get('/bot/periodos', controller.periodos )
route.get('/bot/notas', controller.notas )
route.get('/bot/horarios', controller.horarios )
route.get('/bot/boletos', controller.boletos )

export default route;