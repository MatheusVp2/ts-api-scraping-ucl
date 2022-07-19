import { Router } from "express";

import { BotController } from './../../controller/v1/bot.controller';

const route = Router();

const controller = new BotController();

route.post('/bot/register', controller.register )
route.post('/bot/login', controller.login )
route.get('/bot/notas', controller.notas )
route.get('/bot/boletos', controller.boletos )

export default route;