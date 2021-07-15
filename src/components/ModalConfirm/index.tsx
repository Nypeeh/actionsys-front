import {
  Dispatch,
  ElementType,
  SetStateAction,
  useCallback,
  useState,
} from 'react'
import { AnimatePresence } from 'framer-motion'
import { FaTimes } from 'react-icons/fa'

import DotsLoader from '../DotsLoader'

import { Container, Modal } from './styles'

interface ModalConfirmProps {
  message: string | null
  Icon: ElementType | null
}

interface Props {
  executeConfirmed(): Promise<void>
  data: ModalConfirmProps
  setData: Dispatch<SetStateAction<ModalConfirmProps>>
}

const ModalConfirm: React.FC<Props> = ({ data, setData, executeConfirmed }) => {
  const handleCloseModal = useCallback(() => {
    setData({
      message: null,
      Icon: null,
    })
  }, [setData])

  const [statusSubmit, setStatusSubmit] = useState('')

  const handleSubmit = useCallback(async () => {
    setStatusSubmit('loading')

    await executeConfirmed()
    setStatusSubmit('')
    handleCloseModal()
  }, [executeConfirmed, handleCloseModal])

  return (
    <>
      <Container>
        <AnimatePresence>
          {data.message && (
            <Modal
              initial={{ top: '-30rem' }}
              animate={{ top: '1rem' }}
              exit={{ top: '-30rem' }}
            >
              <button type="button" onClick={handleCloseModal}>
                <FaTimes />
              </button>

              {data.Icon && <data.Icon />}

              <strong>{data.message}</strong>

              <footer>
                <button type="button" onClick={handleCloseModal}>
                  Não
                </button>
                <button type="submit" onClick={handleSubmit}>
                  {statusSubmit === '' ? 'Sim' : <DotsLoader color="white" />}
                </button>
              </footer>
            </Modal>
          )}
        </AnimatePresence>
      </Container>
    </>
  )
}

export default ModalConfirm
