"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EncryptData = void 0;
const crypto_1 = __importDefault(require("crypto"));
const env_1 = require("../config/env");
class EncryptData {
    constructor(chave) {
        const chaveMd5 = crypto_1.default.createHash("md5").update(chave).digest("hex");
        const chaveB64 = Buffer.from(chaveMd5).toString('base64');
        this.algorithm = env_1.env.ENCRYPT.ALGORITHM;
        this.key = Buffer.from(chaveB64, "base64");
        this.iv = '';
    }
    encrypt(text) {
        let cipher = crypto_1.default.createCipheriv(this.algorithm, this.key, this.iv);
        let encrypted = cipher.update(text);
        encrypted = Buffer.concat([encrypted, cipher.final()]);
        return encrypted.toString('hex');
    }
    decrypt(text) {
        let decipher = crypto_1.default.createDecipheriv(this.algorithm, this.key, this.iv);
        let decrypted = decipher.update(Buffer.from(text, 'hex'));
        decrypted = Buffer.concat([decrypted, decipher.final()]);
        return decrypted.toString();
    }
}
exports.EncryptData = EncryptData;
