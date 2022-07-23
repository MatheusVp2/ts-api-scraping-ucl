"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtractError = void 0;
class ExtractError {
    static of(error) {
        const code = error.code || 500;
        const message = error.message;
        const name = error.name;
        return { code, message, name };
    }
}
exports.ExtractError = ExtractError;
