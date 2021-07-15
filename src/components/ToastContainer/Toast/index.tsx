import { useEffect } from 'react'
import { FiAlertCircle, FiCheckCircle, FiInfo, FiXCircle } from 'react-icons/fi'

import { ToastProps, useToast } from '../../../hooks/Toast'

import { Container } from './styles'

const icons = {
  info: <FiInfo size={24} />,
  error: <FiAlertCircle size={24} />,
  success: <FiCheckCircle size={24} />,
}

interface Props {
  toast: ToastProps
}

const Toast: React.FC<Props> = ({ toast }) => {
  const { removeToast } = useToast()

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(String(toast.id))
    }, 7000)

    return () => {
      clearTimeout(timer)
    }
  }, [removeToast, toast.id])

  return (
    <Container
      type={toast.type}
      hasdescription={Number(!!toast.description)}
      initial={{ right: '-120%' }}
      animate={{ right: '0%' }}
      exit={{ right: '-120%' }}
    >
      {icons[toast.type || 'info']}

      <div>
        <strong>{toast.title}</strong>
        {toast.description && <p>{toast.description}</p>}
      </div>
      <button onClick={() => removeToast(String(toast.id))} type="button">
        <FiXCircle size={18} />
      </button>
    </Container>
  )
}

export default Toast
