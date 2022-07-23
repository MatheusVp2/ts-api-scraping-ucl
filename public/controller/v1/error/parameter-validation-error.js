"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParameterValidationError = void 0;
class ParameterValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ParameterValidationError',
            this.code = 400;
    }
}
exports.ParameterValidationError = ParameterValidationError;
