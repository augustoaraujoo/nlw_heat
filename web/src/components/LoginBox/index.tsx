import { VscGithubInverted } from 'react-icons/vsc'
import Styles from './styles.module.scss'
export function LoginBox() {
    return (
        <div className={Styles.LoginBoxWrapper}>
            <strong>Entre e compartilhe sua mensagem </strong>
            <a href='#' className={Styles.sigInWithGithub}> 
            <VscGithubInverted size='24'/>
                Entrar com github
            </a>
        </div>
    )
}