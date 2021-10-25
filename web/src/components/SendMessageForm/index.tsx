import { useContext, useState, FormEvent } from 'react'
import { VscGithubInverted, VscSignOut } from 'react-icons/vsc'
import { AuthContext } from '../../contexts/auth'
import { api } from '../../services/api'
import Styles from './styles.module.scss'

export function SendMessageForm() {

    const { user, signOut } = useContext(AuthContext)
    //armazenando a msg do user
    const [message, setMessage] = useState('')

    async function handleSendMessage(event: FormEvent) {
        event.preventDefault();
        //verificando se o texto está vazio
        //trim remove os espaços em branco
        if (!message.trim()) {
            return;
        }

        await api.post('/messages',{message})
        setMessage('')
    }
    return (
        <div className={Styles.SendMessageFormWrapper}>
            <button onClick={signOut} className={Styles.signOutButton}>
                <VscSignOut size='32' />
            </button>
            <header className={Styles.userInformation}>
                <div className={Styles.userImage}>
                    <img src={user?.avatar_url} alt={user?.name} />
                </div>
                <strong className={Styles.userName}>
                    {user?.name}
                </strong>
                <span className={Styles.userGithub}>
                    <VscGithubInverted size='16' />
                    {user?.login}
                </span>
            </header>
            <form className={Styles.SendMessageForm} onSubmit={handleSendMessage} >
                <label htmlFor='message'>Mensagem</label>
                <textarea
                    name='mensagem'
                    id='mensagem'
                    placeholder='Qual sua expectativa para o evento ?'
                    onChange={event => setMessage(event.target.value)}
                    value={message}
                    required
                />
                <button type='submit'>Enviar Mensagem</button>
            </form>
        </div>
    )
}
