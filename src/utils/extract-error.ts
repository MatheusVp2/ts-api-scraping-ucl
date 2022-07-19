export class ExtractError {

    static of( error: any ){
        const code = error.code || 500;
        const message = error.message
        const name = error.name
        return {code, message, name}
    }

}