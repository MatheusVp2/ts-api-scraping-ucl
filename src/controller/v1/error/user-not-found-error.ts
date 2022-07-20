export class UserNotFoundError extends Error {

    private code : number

    constructor(message: string) {
        super(message)
        this.name = 'UserNotFoundError',
        this.code = 404
    }
    
}