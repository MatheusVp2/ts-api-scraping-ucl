"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PeriodoNotFoundError = void 0;
class PeriodoNotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = 'PeriodoNotFoundError',
            this.code = 404;
    }
}
exports.PeriodoNotFoundError = PeriodoNotFoundError;
