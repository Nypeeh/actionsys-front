import { createContext, useCallback, useContext, useState } from 'react'
import { v4 as uuid } from 'uuid'

import ToastContainer from '../components/ToastContainer'

export type TypeToast = 'info' | 'error' | 'success' | undefined

export interface ToastProps {
  id?: string
  type?: TypeToast
  title?: string
  description?: string
}

interface ToastContextData {
  addToast(props: ToastProps): void
  removeToast(id: string): void
}

const ToastContext = createContext<ToastContextData>({} as ToastContextData)

export const ToastProvider: React.FC = ({ children }) => {
  const [messages, setMessages] = useState<ToastProps[]>([])

  const addToast = useCallback(
    ({ id: idToast, type, title, description }: ToastProps) => {
      let id
      if (idToast) id = idToast
      else id = uuid()

      const toast = {
        id,
        type,
        title,
        description,
      }

      setMessages(state => [...state, toast])
    },
    [],
  )

  const removeToast = useCallback(id => {
    setMessages(state => state.filter(message => message.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <ToastContainer messages={messages} />
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = useContext(ToastContext)

  if (!context) throw new Error('useToast must be used within a ToastProvider')

  return context
}
