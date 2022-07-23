"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BodyLoginUseCase = void 0;
const ServiceUcl_1 = require("../../../extensions/ServiceUcl");
const error_1 = require("../error");
class BodyLoginUseCase {
    static validateBody({ discord_id }) {
        if (discord_id === undefined || !discord_id)
            throw new error_1.MissingParamError(`Parametro 'discord_id' não foi informado.`);
    }
    static validateServiceAuth(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const service = new ServiceUcl_1.ServiceUcl();
            const auth = { user: email, password: password };
            const { session } = yield service.login(auth);
            if (!session)
                throw new error_1.AuthenticationServiceError(`Erro ao autenticar no service UCL.`);
            return session;
        });
    }
}
exports.BodyLoginUseCase = BodyLoginUseCase;
