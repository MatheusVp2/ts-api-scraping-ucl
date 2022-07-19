import { BodyRegisterType, BotRegisterUseCase } from './useCase/bot-register-usecase';
import { UserRepository, UserType } from './../../domain/repository/user-repository';
import { ExtractError } from './../../utils/extract-error';
import { Request, Response } from 'express';

export class BotController {

    public userRepository : UserRepository

    constructor (){
        this.userRepository = new UserRepository()
    }

    async register ( request: Request, response: Response ) {
        

        try {
            const body : BodyRegisterType = request.body;

            BotRegisterUseCase.validateBody(body)

            BotRegisterUseCase.validateEmail(body.email)

            // console.log( this.registerUseCase.validateEmail(body.email) );
            
            // const session = await this.registerUseCase.validateServiceAuth( body.email, body.password )

            // const { email, password, discord_id, send_email } = body;

            // const user : UserType = { email, password, discord_id, send_email, session }

            // this.userRepository.createNewUser(user);

            response.status(201).json({ message: "Usuário cadastrado com sucesso." })
        } catch (error) {
            const { code, name, message } = ExtractError.of(error)
            response.status(code).json({ name, message })
        }
    }

    async login ( request: Request, response: Response ) {
        
    }

    async notas ( request: Request, response: Response ) {
        
    }

    async boletos ( request: Request, response: Response ) {
        
    }

    async delete ( request: Request, response: Response ) {
        
    }

}
