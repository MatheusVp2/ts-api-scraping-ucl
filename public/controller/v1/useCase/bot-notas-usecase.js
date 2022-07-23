"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BotNotasUseCase = void 0;
const error_1 = require("./../error");
class BotNotasUseCase {
    static validateParams({ discord_id }) {
        if (discord_id === undefined || !discord_id)
            throw new error_1.MissingParamError(`Query Parametro 'discord_id' não foi informado.`);
    }
}
exports.BotNotasUseCase = BotNotasUseCase;
