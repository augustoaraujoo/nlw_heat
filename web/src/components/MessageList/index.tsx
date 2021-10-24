import { useEffect, useState } from 'react'
import { api } from '../../services/api'
import Styles from './styles.module.scss'
import logoImg from '../../assets/logo.svg'

type Message = {
    id: string;
    text: string;
    user: {
        name: string;
        avatar_url: string;
    }
}

export function MessageList() {
    //return v-model type => string
    const [messages, setMessages] = useState<Message[]>([])

    useEffect(() => {
        //indicando que o Return é um Array ➡️ <Message[]>
        api.get<Message[]>('/messages/last3').then(response => {
            setMessages(response.data);
        })
        //mounted()
    }, [])


    return (
        <div className={Styles.messageListWrapper}>
            <img src={logoImg} alt='doWhile2021' />
            <ul className={Styles.messageList}>
                {/* mapeando minha api/infos */ messages.map(message => {
                    return (
                        // obrigatório 'v-for' :key
                        <li key={message.id} className={Styles.message}>
                            <p className={Styles.messageContent}>{message.text}</p>
                            <div className={Styles.messageUser}>
                                <div className={Styles.userImage}>
                                    <img src={message.user.avatar_url} alt={message.user.name} />
                                </div>
                                <span>{message.user.name}</span>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}