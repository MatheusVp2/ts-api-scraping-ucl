import { Router } from 'express';

import AuthRouter from './v1/auth.router';
import BotRouter from './v1/bot.router';

const route = Router();

const v1 = [
    AuthRouter,
    BotRouter
]

route.use('/v1', ...v1);

export default route;