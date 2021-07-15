import { useCallback, useEffect, useState } from 'react'

import EmployeeCard from '../../components/EmployeeCard'

// Hooks and Utils
import api from '../../services/api'
import { withAuth } from '../../utils/withAuth'
import { useAuth } from '../../hooks/Auth'

// Styles
import { Container, EmployeesContainer } from '../../styles/Dashboard'
import { useEmployee } from '../../hooks/Employee'
import { FiPlus } from 'react-icons/fi'
import ModalAddEmployee from '../../components/ModalAddEmployee'
import { useToast } from '../../hooks/Toast'

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
  const { token } = useAuth()
  const { addToast } = useToast()

  const { employees, registerEmployeesState } = useEmployee()
  const [isShowModal, setIsShowModal] = useState(false)
  const handleToggleModal = useCallback(() => {
    setIsShowModal(state => !state)
  }, [])

  const getEmployees = useCallback(async () => {
    try {
      const { data } = await api.get('employees', {
        headers: { authorization: `Bearer ${token}` },
      })

      registerEmployeesState(data)
    } catch (error) {
      addToast({
        type: 'error',
        title: 'Houve um problema',
        description: 'Ocorreu um erro ao buscar os funcionários',
      })
    }
  }, [addToast, registerEmployeesState, token])

  useEffect(() => {
    getEmployees()
  }, [])

  return (
    <>
      <Container>
        <h1>Gerenciamento de Funcionários</h1>

        <EmployeesContainer>
          {employees[0] &&
            employees.map(employee => (
              <EmployeeCard key={employee.id} employee={employee} />
            ))}
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
