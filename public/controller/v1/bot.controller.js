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
exports.BotController = void 0;
const data_encrypt_1 = require("../../utils/data-encrypt");
const extract_error_1 = require("./../../utils/extract-error");
const user_repository_1 = require("./../../domain/repository/user-repository");
const bot_notas_usecase_1 = require("./useCase/bot-notas-usecase");
const bot_login_usecase_1 = require("./useCase/bot-login-usecase");
const bot_register_usecase_1 = require("./useCase/bot-register-usecase");
const ServiceUcl_1 = require("../../extensions/ServiceUcl");
const index_1 = require("./../../extensions/ScrapingUcl/index");
const error_1 = require("./error");
const env_1 = require("../../config/env");
class BotController {
    register(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const body = request.body;
                bot_register_usecase_1.BotRegisterUseCase.validateBody(body);
                bot_register_usecase_1.BotRegisterUseCase.validateEmail(body.email);
                const session = yield bot_register_usecase_1.BotRegisterUseCase.validateServiceAuth(body.email, body.password);
                let { email, password, discord_id, send_email } = body;
                const encrypt = new data_encrypt_1.EncryptData(env_1.env.ENCRYPT.SECRET);
                email = encrypt.encrypt(email);
                password = encrypt.encrypt(password);
                const userRepository = new user_repository_1.UserRepository();
                const user = { email, password, discord_id, send_email, session };
                userRepository.createUser(user);
                response.status(201).json({ message: "Usuário cadastrado com sucesso." });
            }
            catch (error) {
                const { code, name, message } = extract_error_1.ExtractError.of(error);
                response.status(code).json({ name, message });
            }
        });
    }
    login(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const body = request.body;
                bot_login_usecase_1.BodyLoginUseCase.validateBody(body);
                const userRepository = new user_repository_1.UserRepository();
                const foundUser = yield userRepository.findUserByDiscordId(body.discord_id);
                if (foundUser.Count === 0)
                    throw new error_1.UserNotFoundError("Usuário não encontrado, registre-se!");
                const user = foundUser.Items[0];
                const encrypt = new data_encrypt_1.EncryptData(env_1.env.ENCRYPT.SECRET);
                let email = encrypt.decrypt(user.email);
                let password = encrypt.decrypt(user.password);
                const session = yield bot_login_usecase_1.BodyLoginUseCase.validateServiceAuth(email, password);
                user.session = session;
                userRepository.updateUser(user);
                response.status(200).json({ message: 'Login efetuado com sucesso!' });
            }
            catch (error) {
                const { code, name, message } = extract_error_1.ExtractError.of(error);
                response.status(code).json({ name, message });
            }
        });
    }
    periodos(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = request.query;
                bot_notas_usecase_1.BotNotasUseCase.validateParams(query);
                const userRepository = new user_repository_1.UserRepository();
                const foundUser = yield userRepository.findUserByDiscordId(query.discord_id);
                if (foundUser.Count === 0)
                    throw new error_1.UserNotFoundError("Usuário não encontrado, registre-se!");
                const user = foundUser.Items[0];
                const service = new ServiceUcl_1.ServiceUcl();
                const pagina = yield service.notas({ session: user.session });
                const periodos = index_1.ScrapingUcl.getPeriodos(pagina, index_1.IdsTabsPeriodosEnum.NOTAS);
                response.status(200).json({ periodos });
            }
            catch (error) {
                const { code, name, message } = extract_error_1.ExtractError.of(error);
                response.status(code).json({ name, message });
            }
        });
    }
    notas(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = request.query;
                bot_notas_usecase_1.BotNotasUseCase.validateParams(query);
                const userRepository = new user_repository_1.UserRepository();
                const foundUser = yield userRepository.findUserByDiscordId(query.discord_id);
                if (foundUser.Count === 0)
                    throw new error_1.UserNotFoundError("Usuário não encontrado, registre-se!");
                const user = foundUser.Items[0];
                const service = new ServiceUcl_1.ServiceUcl();
                const pagina = yield service.notas({ session: user.session });
                if (query.periodo) {
                    const periodos = index_1.ScrapingUcl.getPeriodos(pagina, index_1.IdsTabsPeriodosEnum.NOTAS);
                    if (!periodos.includes(query.periodo))
                        throw new error_1.PeriodoNotFoundError("Periodo informado não existe.");
                    const notas = index_1.ScrapingUcl.getNotasPeriodo(pagina, query.periodo);
                    return response.status(200).json(notas);
                }
                const all_notas = index_1.ScrapingUcl.getAllNotasPeriodos(pagina);
                response.status(200).json(all_notas);
            }
            catch (error) {
                const { code, name, message } = extract_error_1.ExtractError.of(error);
                response.status(code).json({ name, message });
            }
        });
    }
    horarios(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    boletos(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = request.query;
                bot_notas_usecase_1.BotNotasUseCase.validateParams(query);
                const userRepository = new user_repository_1.UserRepository();
                const foundUser = yield userRepository.findUserByDiscordId(query.discord_id);
                if (foundUser.Count === 0)
                    throw new error_1.UserNotFoundError("Usuário não encontrado, registre-se!");
                const user = foundUser.Items[0];
                const service = new ServiceUcl_1.ServiceUcl();
                const pagina = yield service.financeiro({ session: user.session });
                const boletos = index_1.ScrapingUcl.getBoletos(pagina);
                response.status(200).json({ boletos });
            }
            catch (error) {
                const { code, name, message } = extract_error_1.ExtractError.of(error);
                response.status(code).json({ name, message });
            }
        });
    }
}
exports.BotController = BotController;
