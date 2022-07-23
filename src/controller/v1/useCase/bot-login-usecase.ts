import { ServiceUcl } from "../../../extensions/ServiceUcl";
import { AuthServiceUcl } from "../../../extensions/ServiceUcl/types";
import { AuthenticationServiceError, MissingParamError } from "../error";

export type BodyLoginType = {
    discord_id: string
}

export class BodyLoginUseCase {
    
    static validateBody({ discord_id }: BodyLoginType) {
        if(discord_id === undefined || !discord_id) throw new MissingParamError(`Parametro 'discord_id' não foi informado.`);
    }

    static async validateServiceAuth ( email: string, password: string ) {
        const service = new ServiceUcl();
        const auth: AuthServiceUcl = { user: email, password: password }
        const { session } = await service.login(auth);
        if( !session ) throw new AuthenticationServiceError(`Erro ao autenticar no service UCL.`)
        return session
    }
    
}