import { Request, Response } from 'express';
import { UserRepository, UserType } from './../../domain/repository/user-repository';
import { ExtractError } from './../../utils/extract-error';
import { UserNotFoundError } from './error';
import { BodyLoginType, BodyLoginUseCase } from './useCase/bot-login-usercase';
import { BodyRegisterType, BotRegisterUseCase } from './useCase/bot-register-usecase';

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

            const session = await BotRegisterUseCase.validateServiceAuth(body.email, body.password)
            const { email, password, discord_id, send_email } = body;
            const user : UserType = { email, password, discord_id, send_email, session }
            this.userRepository.createUser(user);

            response.status(201).json({ message: "Usuário cadastrado com sucesso." })
        } catch (error) {
            const { code, name, message } = ExtractError.of(error)
            response.status(code).json({ name, message })
        }
    }

    async login ( request: Request, response: Response ) {
        const body : BodyLoginType = request.body
        try {
            BodyLoginUseCase.validateBody(body)
            const foundUser = await this.userRepository.findUserByDiscordId(body.discord_id)
            if (foundUser.Count === 0) throw new UserNotFoundError("Usuário não encontrado, registre-se")
            const user = foundUser.Items[0] as UserType
            const session = await BodyLoginUseCase.validateServiceAuth(user.email, user.password)
            user.session = session
            this.userRepository.updateUser(user)
            response.status(200).json({message: 'Login efetuado com sucesso!'})
        } catch (error) {
            const { code, name, message } = ExtractError.of(error)
            response.status(code).json({ name, message })
        }


    }

    async notas ( request: Request, response: Response ) {
        
    }
    
    async aulas ( request: Request, response: Response ) {
        
    }

    async boletos ( request: Request, response: Response ) {
        
    }

    async delete ( request: Request, response: Response ) {
        
    }

}
