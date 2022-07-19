export class ParameterValidationError extends Error {

    private code : number

    constructor(message: string) {
        super(message)
        this.name = 'ParameterValidationError',
        this.code = 400
    }
    
}