"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_router_1 = __importDefault(require("./v1/auth.router"));
const bot_router_1 = __importDefault(require("./v1/bot.router"));
const route = (0, express_1.Router)();
const v1 = [
    auth_router_1.default,
    bot_router_1.default
];
route.use('/v1', ...v1);
exports.default = route;
