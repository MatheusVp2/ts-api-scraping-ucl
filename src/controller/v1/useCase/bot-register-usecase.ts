import { ParameterValidationError } from './../error/parameter-validation-error';
import { ServiceUcl } from "../../../extensions/ServiceUcl";
import { AuthServiceUcl } from "../../../extensions/ServiceUcl/types";
import { AuthenticationServiceError, MissingParamError } from "../error";

export type BodyRegisterType = {
    email: string,
    password: string,
    discord_id?: string,
    send_email?: boolean
}

export class BotRegisterUseCase {

    static validateBody ( { email, password, discord_id, send_email } : BodyRegisterType ) {
        if ( !email || email === '' ) throw new MissingParamError(`Parametro 'email' não foi informado.`);
        if ( !password || password === '' ) throw new MissingParamError(`Parametro 'password' não foi informado.`);
        if ( !discord_id || discord_id === '' ) throw new MissingParamError(`Parametro 'discord_id' não foi informado.`);
        if ( !send_email ) throw new MissingParamError(`Parametro 'send_email' não foi informado.`);
    }

    static validateEmail ( email: string ) {
        var re = new RegExp(/\S+@\S+\.\S+/);
        if ( !re.test(email) ) throw new ParameterValidationError(`Parametro de 'email' invalido.`)
        const sep = email.split("@")
        if ( !sep[1].includes('ucl.br') ) throw new ParameterValidationError(`Parametro de 'email' invalido, somente com dominio UCL.`)
    }

    static async validateServiceAuth ( email: string, password: string ) {
        const service = new ServiceUcl();
        const auth: AuthServiceUcl = { user: email, password: password }
        const { session } = await service.login(auth);
        if( !session ) throw new AuthenticationServiceError(`Erro ao autenticar no service UCL.`)
        return session
    }

    static async validateUserDatabase () {

    }

}