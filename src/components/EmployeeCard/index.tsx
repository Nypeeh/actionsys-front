import { useCallback, useMemo, useState } from 'react'
import { FiUser } from 'react-icons/fi'
import { format, parseISO } from 'date-fns'

import { IEmployee } from '../../pages/dashboard'
import Button from '../Button'
import ModalEditEmployee from '../ModalEditEmployee'
import { Container, ImgContainer } from './styles'

interface EmployeeCardProps {
  employee: IEmployee
}

const EmployeeCard: React.FC<EmployeeCardProps> = ({ employee }) => {
  const [isShowModal, setIsShowModal] = useState(false)

  const handleToggleModal = useCallback(() => {
    setIsShowModal(state => !state)
  }, [])

  const birthdayDateFormated = useMemo(() => {
    const dataFormated = format(parseISO(employee.birthday_date), 'dd/MM/yyyy')

    return dataFormated
  }, [employee.birthday_date])

  const admissionDateFormated = useMemo(() => {
    const dataFormated = format(parseISO(employee.admission_date), 'dd/MM/yyyy')

    return dataFormated
  }, [employee.admission_date])

  return (
    <>
      <Container>
        <div>
          <ImgContainer>
            <FiUser />
          </ImgContainer>

          <main>
            <strong>{employee.name}</strong>
            <p>
              Data Aniversário: <b>{birthdayDateFormated}</b>
            </p>
            <p>
              Data Admissão: <b>{admissionDateFormated}</b>
            </p>
            <p>
              Setor: <b>{employee.sector}</b>
            </p>
            <p>
              Cargo: <b>{employee.office}</b>
            </p>
            <p>
              Nível: <b>{employee.level}</b>
            </p>

            <Button type="button" onClick={handleToggleModal}>
              Editar
            </Button>
          </main>
        </div>
      </Container>

      {isShowModal && (
        <ModalEditEmployee
          employee={employee}
          handleToggleModal={handleToggleModal}
        />
      )}
    </>
  )
}

export default EmployeeCard
