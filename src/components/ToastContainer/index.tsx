import Toast from './Toast'

import { Container } from './styles'
import { AnimatePresence } from 'framer-motion'
import { ToastProps } from '../../hooks/Toast'

interface ToastContainerProps {
  messages: ToastProps[]
}

const ToastContainer: React.FC<ToastContainerProps> = ({ messages }) => {
  return (
    <Container>
      <AnimatePresence>
        {messages.map((message: ToastProps) => {
          return <Toast key={message.id} toast={message} />
        })}
      </AnimatePresence>
    </Container>
  )
}

export default ToastContainer
