import { Request, Response } from 'express';

import { EncryptData } from '../../utils/data-encrypt';
import { ExtractError } from './../../utils/extract-error';

import { UserRepository, UserType } from './../../domain/repository/user-repository';

import { BotNotasUseCase, ParamsGetType } from './useCase/bot-notas-usecase';
import { BodyLoginType, BodyLoginUseCase } from './useCase/bot-login-usecase';
import { BodyRegisterType, BotRegisterUseCase } from './useCase/bot-register-usecase';

import { ServiceUcl } from '../../extensions/ServiceUcl';
import { IdsTabsPeriodosEnum, ScrapingUcl } from './../../extensions/ScrapingUcl/index';

import { UserNotFoundError, PeriodoNotFoundError } from './error';
import { env } from "../../config/env";

export class  BotController {

    async register ( request: Request, response: Response ) {
        try {
            const body : BodyRegisterType = request.body;
            BotRegisterUseCase.validateBody(body)
            BotRegisterUseCase.validateEmail(body.email)

            const session = await BotRegisterUseCase.validateServiceAuth(body.email, body.password)
            
            let { email, password, discord_id, send_email } = body;

            const encrypt = new EncryptData(env.ENCRYPT.SECRET)
            email = encrypt.encrypt(email)
            password = encrypt.encrypt(password)

            const userRepository = new UserRepository()

            const user : UserType = { email, password, discord_id, send_email, session }
            userRepository.createUser(user);

            response.status(201).json({ message: "Usuário cadastrado com sucesso." })
        } catch (error) {
            const { code, name, message } = ExtractError.of(error)
            response.status(code).json({ name, message })
        }
    }

    async login ( request: Request, response: Response ) {
        try {
            const body : BodyLoginType = request.body
            BodyLoginUseCase.validateBody(body)
            
            const userRepository = new UserRepository()
            const foundUser = await userRepository.findUserByDiscordId(body.discord_id)
            if (foundUser.Count === 0) throw new UserNotFoundError("Usuário não encontrado, registre-se!")

            const user = foundUser.Items[0] as UserType
            
            const encrypt = new EncryptData(env.ENCRYPT.SECRET)
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

    async periodos ( request: Request, response: Response ) {
        try {
            const query = request.query as ParamsGetType;
            BotNotasUseCase.validateParams(query)

            const userRepository = new UserRepository()

            const foundUser = await userRepository.findUserByDiscordId(query.discord_id)
            if (foundUser.Count === 0) throw new UserNotFoundError("Usuário não encontrado, registre-se!")

            const user = foundUser.Items[0] as UserType

            const service = new ServiceUcl()
            const pagina =  await service.notas( { session: user.session } )
            const periodos = ScrapingUcl.getPeriodos( pagina, IdsTabsPeriodosEnum.NOTAS )

            response.status(200).json( { periodos } )
        } catch (error) {
            const { code, name, message } = ExtractError.of(error)
            response.status(code).json({ name, message })
        }
    }

    async notas ( request: Request, response: Response ) {
        try {
            const query = request.query as ParamsGetType;
            BotNotasUseCase.validateParams(query)

            const userRepository = new UserRepository()
            const foundUser = await userRepository.findUserByDiscordId(query.discord_id)
            if (foundUser.Count === 0) throw new UserNotFoundError("Usuário não encontrado, registre-se!")

            const user = foundUser.Items[0] as UserType
            const service = new ServiceUcl()
            const pagina =  await service.notas( { session: user.session } )

            if( query.periodo ) {
                const periodos = ScrapingUcl.getPeriodos( pagina, IdsTabsPeriodosEnum.NOTAS )
                if( !periodos.includes(query.periodo) ) throw new PeriodoNotFoundError("Periodo informado não existe.")
                const notas = ScrapingUcl.getNotasPeriodo(pagina, query.periodo)
                return response.status(200).json(notas)
            }

            const all_notas = ScrapingUcl.getAllNotasPeriodos(pagina)
            response.status(200).json(all_notas)
        } catch (error) {
            const { code, name, message } = ExtractError.of(error)
            response.status(code).json({ name, message })
        }
    }

    async horarios ( request: Request, response: Response ) {
        try {
            const query = request.query as ParamsGetType;
            BotNotasUseCase.validateParams(query)

            const userRepository = new UserRepository()
            const foundUser = await userRepository.findUserByDiscordId(query.discord_id)
            if (foundUser.Count === 0) throw new UserNotFoundError("Usuário não encontrado, registre-se!")

            const user = foundUser.Items[0] as UserType
            const service = new ServiceUcl()
            const pagina =  await service.horario( { session: user.session } )

            const periodos = ScrapingUcl.getPeriodos( pagina, IdsTabsPeriodosEnum.HORARIOS )
            const pagePeriodo = ScrapingUcl.getHtmlPeriodo(pagina, periodos[0])
            const horarios = ScrapingUcl.getHorarios(pagePeriodo);

            response.status(200).json(horarios)
        } catch (error) {
            const { code, name, message } = ExtractError.of(error)
            response.status(code).json({ name, message })
        }
    }

    async boletos ( request: Request, response: Response ) {
        try {
            const query = request.query as ParamsGetType;
            BotNotasUseCase.validateParams(query)

            const userRepository = new UserRepository()
            const foundUser = await userRepository.findUserByDiscordId(query.discord_id)
            if (foundUser.Count === 0) throw new UserNotFoundError("Usuário não encontrado, registre-se!")

            const user = foundUser.Items[0] as UserType
            const service = new ServiceUcl()

            const pagina =  await service.financeiro( { session: user.session } )
            const boletos = ScrapingUcl.getBoletos(pagina)
            response.status(200).json( { boletos } )
        } catch (error) {
            const { code, name, message } = ExtractError.of(error)
            response.status(code).json({ name, message })
        }
    }

}
