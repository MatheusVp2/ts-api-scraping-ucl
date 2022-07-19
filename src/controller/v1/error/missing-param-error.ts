export class MissingParamError extends Error {
    
    private code : number

    constructor( message: string ) {
        super(message)
        this.name = 'MissingParamError'
        this.code = 400
    }

}