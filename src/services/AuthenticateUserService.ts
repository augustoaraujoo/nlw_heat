import axios from 'axios';
import prismaClient from '../prisma/index';
/*
    * Receber o código code(string) ✔️
    * Recupear o acess_token no github ✔️
    * Verificar se o usuário existe no DB ✔️
    * ---Sim = gera um token 
    * ---Não = cria no DB , gera um token
    * Retornar o token com as infos do user
*/
interface IAcessTokenResponse {
    access_token: string
}
interface IUserResponse {
    avatar_url: string,
    login: string,
    id: number,
    name: string,
}
class AuthenticateUserService {
    async execute(code: string) {
        const url = "https://github.com/login/oauth/access_token";
        const { data: accessTokenResponse } = await axios.post<IAcessTokenResponse>(url, null, {
            params: {
                client_id: process.env.GITHUB_CLIENT_ID,
                client_secret: process.env.GITHUB_CLIENT_SECRET,
                code,
            },
            headers: {
                "Accept": "application/json",
            }
        })
        const response = await axios.get<IUserResponse>('https://api.github.com/user', {
            headers: {
                authorization: `Bearer ${accessTokenResponse.access_token}`
            }
        });
        const { login, id , avatar_url, name } = response.data;
        let user = await prismaClient.user.findFirst({
            where: {
                github_id : id
            }
        })
        if (!user) {
           user = await prismaClient.user.create({
                data:{
                    github_id: id,
                    login,
                    avatar_url,
                    name,
                }
            })
        }
        return response.data;
    }
}
export { AuthenticateUserService }