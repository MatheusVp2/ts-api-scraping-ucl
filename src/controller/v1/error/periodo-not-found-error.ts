export class PeriodoNotFoundError extends Error {
    private code : number

    constructor(message: string) {
        super(message)
        this.name = 'PeriodoNotFoundError',
        this.code = 404
    }
    
}