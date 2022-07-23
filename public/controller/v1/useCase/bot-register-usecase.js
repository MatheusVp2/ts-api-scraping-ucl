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
exports.BotRegisterUseCase = void 0;
const ServiceUcl_1 = require("../../../extensions/ServiceUcl");
const error_1 = require("../error");
const parameter_validation_error_1 = require("./../error/parameter-validation-error");
class BotRegisterUseCase {
    static validateBody({ email, password, discord_id, send_email }) {
        if (!email || email === '')
            throw new error_1.MissingParamError(`Parametro 'email' não foi informado.`);
        if (!password || password === '')
            throw new error_1.MissingParamError(`Parametro 'password' não foi informado.`);
        if (!discord_id || discord_id === '')
            throw new error_1.MissingParamError(`Parametro 'discord_id' não foi informado.`);
        if (!send_email)
            throw new error_1.MissingParamError(`Parametro 'send_email' não foi informado.`);
    }
    static validateEmail(email) {
        var re = new RegExp(/\S+@\S+\.\S+/);
        if (!re.test(email))
            throw new parameter_validation_error_1.ParameterValidationError(`Parametro de 'email' invalido.`);
        const sep = email.split("@");
        if (!sep[1].includes('ucl.br'))
            throw new parameter_validation_error_1.ParameterValidationError(`Parametro de 'email' invalido, somente com dominio UCL.`);
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
exports.BotRegisterUseCase = BotRegisterUseCase;
