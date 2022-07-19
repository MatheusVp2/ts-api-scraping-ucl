export class AuthenticationServiceError extends Error {

    private code: number

    constructor(message: string) {
        super(message)
        this.name = 'AutenticationServiceError'
        this.code = 401
    }

}