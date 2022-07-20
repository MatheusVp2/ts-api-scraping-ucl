import { Request, Response } from 'express';
import { EncryptData } from '../../utils/data-encrypt';
import { UserRepository, UserType } from './../../domain/repository/user-repository';
import { ExtractError } from './../../utils/extract-error';
import { UserNotFoundError } from './error';
import { BodyLoginType, BodyLoginUseCase } from './useCase/bot-login-usercase';
import { BodyRegisterType, BotRegisterUseCase } from './useCase/bot-register-usecase';
import { env } from "../../config/env";

export class  BotController {

    async register ( request: Request, response: Response ) {
        try {
            const userRepository = new UserRepository();

            const body : BodyRegisterType = request.body;
            BotRegisterUseCase.validateBody(body)
            BotRegisterUseCase.validateEmail(body.email)

            const session = await BotRegisterUseCase.validateServiceAuth(body.email, body.password)
            
            let { email, password, discord_id, send_email } = body;

            const encrypt = new EncryptData(env.SECRET_ENCRYPT)
            email = encrypt.encrypt(email)
            password = encrypt.encrypt(password)

            const user : UserType = { email, password, discord_id, send_email, session }
            userRepository.createUser(user);

            response.status(201).json({ message: "Usuário cadastrado com sucesso." })
        } catch (error) {
            const { code, name, message } = ExtractError.of(error)
            response.status(code).json({ name, message })
        }
    }
    
    async delete ( request: Request, response: Response ) {
        
    }

    async login ( request: Request, response: Response ) {
        try {
            const userRepository = new UserRepository();

            const body : BodyLoginType = request.body

            BodyLoginUseCase.validateBody(body)
            
            const foundUser = await userRepository.findUserByDiscordId(body.discord_id)
            if (foundUser.Count === 0) throw new UserNotFoundError("Usuário não encontrado, registre-se")

            const user = foundUser.Items[0] as UserType
            
            const encrypt = new EncryptData(env.SECRET_ENCRYPT)
            let email = encrypt.decrypt(user.email)
            let password = encrypt.decrypt(user.password)

            const session = await BodyLoginUseCase.validateServiceAuth(email, password)
            user.session = session
            userRepository.updateUser(user)

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

    

}
