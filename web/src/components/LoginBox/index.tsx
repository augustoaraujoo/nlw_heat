import { useEffect } from 'react'
import { VscGithubInverted } from 'react-icons/vsc'
import { api } from '../../services/api'
import Styles from './styles.module.scss'

type AuthResponse = {
    token: string,
    user: {
        id: string,
        avatar_url: string,
        name: string,
        login: string
    }
}

export function LoginBox() {

    const sigInUrl = `https://github.com/login/oauth/authorize?scope=user&client_id=ec1f91652a77df846b3b`

    async function sigIn(githubCode: string) {
        const response = await api.post<AuthResponse>('/authenticate', {
            code: githubCode,
        })

        const { token, user } = response.data;

        localStorage.setItem('@dowhile:token', token)

        console.log(user);

    }
    //pegando o code do usuário logado no github dentro da URL
    useEffect(() => {
        const url = window.location.href;
        const hasGithubCode = url.includes('?code=');

        if (hasGithubCode) {
            const [urlWithoutCode, githubCode] = url.split('?code=')
            // limpando o code da url para não ficar visível
            window.history.pushState({}, '', urlWithoutCode);

            sigIn(githubCode)
        }
    }, [])


    return (
        <div className={Styles.LoginBoxWrapper}>
            <strong>Entre e compartilhe sua mensagem </strong>
            <a href={sigInUrl} className={Styles.sigInWithGithub}>
                <VscGithubInverted size='24' />
                Entrar com github
            </a>
        </div>
    )
}