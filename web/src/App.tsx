import { LoginBox } from './components/LoginBox'
import { MessageList } from './components/MessageList'
import Styles from './styles/global.module.scss'

export function App() {
  return (
    <main className={Styles.contentWrapper}>
      <MessageList/>
      <LoginBox/>
    </main>
  )
}

