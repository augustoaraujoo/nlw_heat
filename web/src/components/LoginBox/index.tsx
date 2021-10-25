import { useContext } from 'react'
import { VscGithubInverted } from 'react-icons/vsc'
import { AuthContext } from '../../contexts/auth'
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

    const { signInUrl } = useContext(AuthContext)

    return (
        <div className={Styles.LoginBoxWrapper}>
            <strong>Entre e compartilhe sua mensagem </strong>
            <a href={signInUrl} className={Styles.sigInWithGithub}>
                <VscGithubInverted size='24' />
                Entrar com github
            </a>
        </div>
    )
}