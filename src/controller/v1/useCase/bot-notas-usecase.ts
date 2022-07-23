import { MissingParamError } from './../error';


export type ParamsGetType = {
    discord_id: string,
    periodo?: string
}

export class BotNotasUseCase {

    static validateParams({ discord_id }: ParamsGetType) {
        if(discord_id === undefined || !discord_id) throw new MissingParamError(`Query Parametro 'discord_id' não foi informado.`);
    }
    
}