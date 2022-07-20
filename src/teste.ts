import { UserRepository, UserType  } from './domain/repository/user-repository'

const repo = new UserRepository()

const user : UserType = {
    email: 'matheusvp2@ucl.com',
    password: '123',
    discord_id: '123456',
    send_email: true,
    id: '123123123123'
}

repo.createUser(user)
