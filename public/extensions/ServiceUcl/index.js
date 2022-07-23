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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceUcl = void 0;
const axios_1 = __importDefault(require("axios"));
const axios_cookiejar_support_1 = require("axios-cookiejar-support");
const tough_cookie_1 = require("tough-cookie");
const types_1 = require("./types");
(0, axios_cookiejar_support_1.wrapper)(axios_1.default);
class ServiceUcl {
    getSession(session, url) {
        const newSession = new tough_cookie_1.CookieJar();
        if (session && url)
            newSession.setCookie(tough_cookie_1.Cookie.parse(session), url);
        return newSession;
    }
    login(credenciais) {
        return __awaiter(this, void 0, void 0, function* () {
            const newSession = this.getSession();
            axios_1.default.defaults.headers.post['Referer'] = types_1.LinksUcl.LOGIN;
            const authPage = yield axios_1.default.get(types_1.LinksUcl.LOGIN, { jar: newSession });
            const csfr = authPage.config.jar.toJSON().cookies[0].value || null;
            credenciais.csrfmiddlewaretoken = csfr;
            const dataAuthBody = new URLSearchParams(credenciais).toString();
            const authLogin = yield axios_1.default.post(types_1.LinksUcl.LOGIN, dataAuthBody, { jar: newSession });
            const cookiesPage = authLogin.headers['set-cookie'];
            const cookieSession = cookiesPage.filter(cookie => cookie.match(`^sessionid`))[0] || null;
            return { session: cookieSession };
        });
    }
    notas({ session }) {
        return __awaiter(this, void 0, void 0, function* () {
            const newSession = this.getSession(session, types_1.LinksUcl.QUADRODENOTAS);
            const quadroDeNotasPage = yield axios_1.default.get(types_1.LinksUcl.QUADRODENOTAS, { jar: newSession });
            return quadroDeNotasPage.data;
        });
    }
    financeiro({ session }) {
        return __awaiter(this, void 0, void 0, function* () {
            const newSession = this.getSession(session, types_1.LinksUcl.FINANCEIRO);
            const financeiroPage = yield axios_1.default.get(types_1.LinksUcl.FINANCEIRO, { jar: newSession });
            return financeiroPage.data;
        });
    }
    horario({ session }) {
        return __awaiter(this, void 0, void 0, function* () {
            const newSession = this.getSession(session, types_1.LinksUcl.HORARIO);
            const horarioPage = yield axios_1.default.get(types_1.LinksUcl.HORARIO, { jar: newSession });
            return horarioPage.data;
        });
    }
}
exports.ServiceUcl = ServiceUcl;
