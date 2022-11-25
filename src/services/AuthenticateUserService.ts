import { getRepository } from 'typeorm';
import User from "../models/User";
import { compare } from 'bcrypt';


interface Request {
    email: string;
    password: string;
}

interface Response {
    user: User
}
class AuthenticateUserService {
    public async execute({ email, password }: Request): Promise<Response> {
        const usersRepository = getRepository(User);

        const user =  await usersRepository.findOne({
            where: { email: email },
        });

        if (!user) {
            throw new Error('E-mail ou senha incorreto.')
        }

        const passwordMatched = await compare(password, user.password);

        if (!passwordMatched) {
            throw new Error('E-mail ou senha incorreto.')
        }

        return {
            user,
        };
    }
}

export default AuthenticateUserService;
