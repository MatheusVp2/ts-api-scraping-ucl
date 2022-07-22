import crypto from "crypto";
import { env } from "../config/env";

export class EncryptData {
    algorithm: string;
    key: Buffer;
    iv: any;

    constructor(chave: string){
        const chaveMd5 = crypto.createHash("md5").update(chave).digest("hex")
        const chaveB64 = Buffer.from(chaveMd5).toString('base64')

        this.algorithm = env.ENCRYPT.ALGORITHM;
        this.key = Buffer.from( chaveB64, "base64" );
        this.iv = ''
    }

    encrypt(text: string){
        let cipher = crypto.createCipheriv(this.algorithm, this.key, this.iv);
        let encrypted = cipher.update(text);
        encrypted = Buffer.concat([encrypted, cipher.final()]);
        return encrypted.toString('hex');
    }

    decrypt(text: string) {
        let decipher = crypto.createDecipheriv(this.algorithm, this.key, this.iv);
        let decrypted = decipher.update(Buffer.from(text, 'hex'));
        decrypted = Buffer.concat([decrypted, decipher.final()]);
        return decrypted.toString();
    }
}

