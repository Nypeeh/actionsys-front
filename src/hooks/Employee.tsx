import {
  createContext,
  RefObject,
  useCallback,
  useContext,
  useState,
} from 'react'
import { addDays } from 'date-fns'
import * as Yup from 'yup'
import { FormHandles } from '@unform/core'

import { IEmployee } from '../pages/dashboard'
import { useAuth } from './Auth'
import { useToast } from './Toast'
import api from '../services/api'
import { getValidationErrors } from '../utils/getValidationErrors'

interface IUpdateEmployeeValues {
  name: string
  email: string
  sector: string
  birthday_date: string
  admission_date: string
  office: string
  level: string
}

interface IUpdateEmployee {
  employeeId: number
  formRef: RefObject<FormHandles>
  values: IUpdateEmployeeValues
}
interface EmployeeContextData {
  employees: IEmployee[]
  registerEmployeesState(employees: IEmployee[]): void
  addEmployee(employee: IEmployee): void
  updateEmployee({ employeeId, formRef, values }: IUpdateEmployee): void
  removeEmployee(employeeId: number): void
}

const EmployeeContext = createContext<EmployeeContextData>(
  {} as EmployeeContextData,
)

export const EmployeeProvider: React.FC = ({ children }) => {
  const { token } = useAuth()
  const { addToast } = useToast()
  const [employees, setEmployees] = useState<IEmployee[]>([])

  const registerEmployeesState = useCallback((employees: IEmployee[]) => {
    setEmployees(employees)
  }, [])

  const addEmployee = useCallback((employee: IEmployee) => {
    setEmployees(state => [...state, employee])
  }, [])

  const updateEmployee = useCallback(
    async ({ employeeId, formRef, values }: IUpdateEmployee) => {
      try {
        const birthday = addDays(new Date(values.birthday_date).getTime(), 1)
        const admission = addDays(new Date(values.admission_date).getTime(), 1)

        const formData = {
          ...values,
          birthday_date: birthday,
          admission_date: admission,
        }

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          sector: Yup.string().required('Setor obrigatório'),
          office: Yup.string().required('Cargo obrigatório'),
          level: Yup.string().required('Nível obrigatório'),
          admission_date: Yup.string().required('Data admissão obrigatória'),
          birthday_date: Yup.string().required('Aniversário obrigatório'),
        })

        await schema.validate(formData, {
          abortEarly: false,
        })

        const { data } = await api.put(`employees/${employeeId}`, formData, {
          headers: { authorization: `Bearer ${token}` },
        })

        addToast({
          type: 'success',
          title: 'Dados alterados com sucesso!',
        })

        const employeeIndex = employees.findIndex(
          employee => employee.id === employeeId,
        )

        const allEmployees = employees.slice()
        allEmployees[employeeIndex] = data

        setEmployees(allEmployees)
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error)

          formRef.current?.setErrors(errors)

          addToast({
            type: 'error',
            title: 'Campos faltando ou inválidos!',
            description: 'Verifique se não deixou passar nenhum campo.',
          })
        } else {
          addToast({
            type: 'error',
            title: 'Houve um problema ao tentar atualizar os dados!',
          })
        }
      }
    },
    [addToast, employees, token],
  )

  const removeEmployee = useCallback(id => {
    setEmployees(state => state.filter(message => message.id !== id))
  }, [])

  return (
    <EmployeeContext.Provider
      value={{
        employees,
        registerEmployeesState,
        addEmployee,
        updateEmployee,
        removeEmployee,
      }}
    >
      {children}
    </EmployeeContext.Provider>
  )
}

export function useEmployee() {
  const context = useContext(EmployeeContext)

  if (!context) {
    throw new Error('useEmployee must be used within a EmployeeProvider')
  }

  return context
}
