import { useCallback, useEffect, useState } from 'react'
import { FaSadTear } from 'react-icons/fa'
import { FiPlus } from 'react-icons/fi'

// Components
import EmployeeCard from '../../components/EmployeeCard'
import ModalAddEmployee from '../../components/ModalAddEmployee'

// Hooks and Utils
import { withAuth } from '../../utils/withAuth'
import { useEmployee } from '../../hooks/Employee'

import { Container, EmployeesContainer } from '../../styles/Dashboard'

export interface IEmployee {
  id: number
  name: string
  email: string
  office: string
  level: string
  sector: string
  birthday_date: string
  admission_date: string
}

const Dashboard: React.FC = () => {
  const { employees, getEmployees } = useEmployee()
  const [isShowModal, setIsShowModal] = useState(false)

  const handleToggleModal = useCallback(() => {
    setIsShowModal(state => !state)
  }, [])

  useEffect(() => {
    getEmployees()
  }, [])

  return (
    <>
      <Container>
        <h1>Gerenciamento de Funcionários</h1>

        <EmployeesContainer>
          {employees[0] ? (
            employees.map(employee => (
              <EmployeeCard key={employee.id} employee={employee} />
            ))
          ) : (
            <h2>
              Nenhum funcionário encontrado!
              <FaSadTear />
            </h2>
          )}
        </EmployeesContainer>

        <button type="button" onClick={handleToggleModal}>
          <FiPlus />
        </button>
      </Container>

      {isShowModal && (
        <ModalAddEmployee handleToggleModal={handleToggleModal} />
      )}
    </>
  )
}

export default withAuth(Dashboard)
