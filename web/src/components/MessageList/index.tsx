import { useEffect, useState } from 'react'
import { api } from '../../services/api'
import io from 'socket.io-client'
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

//fila de mensagens

const messagesQueue: Message[] = [];

const socket = io('http://localhost:4000/')
socket.on('new_message', (newMessage: Message) => {

    messagesQueue.push(newMessage)

})

export function MessageList() {
    //return v-model type => string
    const [messages, setMessages] = useState<Message[]>([])

    useEffect(() => {
        const timer = setInterval(() => {
            if (messagesQueue.length > 0) {
                setMessages(prevState => [
                    messagesQueue[0],
                    prevState[0],
                    prevState[1]
                ].filter(Boolean))
                messagesQueue.shift()
            }
        }, 3000)
    }, [])

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