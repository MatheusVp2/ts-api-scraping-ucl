import { UserRepository, UserType } from './../../domain/repository/user-repository';
import { Request, Response } from 'express';

export class AuthController {

    static async post(request: Request, response: Response) {

        response.status(200).json({ message: "Rota de Autenticação com o Web Aluno." })
    }

}
