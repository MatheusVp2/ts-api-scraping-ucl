"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MissingParamError = void 0;
class MissingParamError extends Error {
    constructor(message) {
        super(message);
        this.name = 'MissingParamError';
        this.code = 400;
    }
}
exports.MissingParamError = MissingParamError;
