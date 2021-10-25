import { useContext } from 'react'
import { LoginBox } from './components/LoginBox'
import { MessageList } from './components/MessageList'
import { SendMessageForm } from './components/SendMessageForm'
import { AuthContext } from './contexts/auth'
import Styles from './styles/global.module.scss'

export function App() {
  const { user } = useContext(AuthContext);
  
  return (
    <main className={Styles.contentWrapper}>
      <MessageList/>
      { !!user ? <SendMessageForm/> : <LoginBox/> }
    </main>
  )
}

