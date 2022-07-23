"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationServiceError = void 0;
class AuthenticationServiceError extends Error {
    constructor(message) {
        super(message);
        this.name = 'AutenticationServiceError';
        this.code = 401;
    }
}
exports.AuthenticationServiceError = AuthenticationServiceError;
