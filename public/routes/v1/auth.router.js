"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../../controller/v1/auth.controller");
const route = (0, express_1.Router)();
route.post('/auth', auth_controller_1.AuthController.post);
exports.default = route;
