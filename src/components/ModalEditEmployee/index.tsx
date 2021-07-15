import {
  ElementType,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { format, parseISO } from 'date-fns'
import { Form } from '@unform/web'
import { FaTimes } from 'react-icons/fa'
import { FormHandles } from '@unform/core'
import { FiCalendar, FiTrash, FiUser } from 'react-icons/fi'

// Components
import Input from '../Inputs/Input'
import SingleSelect from '../Inputs/Select'
import InputDate from '../Inputs/InputDate'
import Button from '../Button'

import { IEmployee } from '../../pages/dashboard'
import { Container, Overlay } from './styles'
import ModalConfirm from '../ModalConfirm'
import { useEmployee } from '../../hooks/Employee'

interface ModalEditEmployeeProps {
  handleToggleModal(): void
  employee: IEmployee
}

interface ModalConfirmProps {
  message: string | null
  Icon: ElementType | null
}
const ModalEditEmployee: React.FC<ModalEditEmployeeProps> = ({
  handleToggleModal,
  employee,
}) => {
  const { deleteEmployee, updateEmployee } = useEmployee()
  const formRef = useRef<FormHandles>(null)
  const [modalConfirm, setModalConfirm] = useState<ModalConfirmProps>(
    {} as ModalConfirmProps,
  )

  const birthdayDateFormated = useMemo(() => {
    const dataFormated = format(parseISO(employee.birthday_date), 'yyyy-MM-dd')

    return dataFormated
  }, [employee.birthday_date])

  const admissionDateFormated = useMemo(() => {
    const dataFormated = format(parseISO(employee.admission_date), 'yyyy-MM-dd')

    return dataFormated
  }, [employee.admission_date])

  const handleUpdateEmployee = useCallback(
    async values => {
      updateEmployee({ employeeId: employee.id, formRef, values })
    },
    [employee.id, updateEmployee],
  )

  const handleDeleteEmployee = useCallback(async () => {
    await deleteEmployee({
      employeeId: employee.id,
      employeeName: employee.name,
    })
  }, [deleteEmployee, employee.id, employee.name])

  const handleOpenModal = useCallback(() => {
    setModalConfirm({
      message: 'Você tem certeza que deseja excluir este funcionário?',
      Icon: FiTrash,
    })
  }, [])

  useEffect(() => {
    if (formRef.current) {
      formRef.current?.setFieldValue('name', employee.name)
      formRef.current?.setFieldValue('email', employee.email)
      formRef.current?.setFieldValue('sector', employee.sector)
      formRef.current?.setFieldValue('office', employee.office)
      formRef.current?.setFieldValue('birthday_date', birthdayDateFormated)
      formRef.current?.setFieldValue('admission_date', admissionDateFormated)
      formRef.current?.setFieldValue('level', employee.level)
    }
  }, [
    admissionDateFormated,
    birthdayDateFormated,
    employee.admission_date,
    employee.birthday_date,
    employee.email,
    employee.level,
    employee.name,
    employee.office,
    employee.sector,
  ])

  return (
    <>
      <Container>
        <button type="button" onClick={handleToggleModal}>
          <FaTimes />
        </button>

        <h2>
          Dados do Funcionário{' '}
          <button type="button" onClick={handleOpenModal}>
            <FiTrash />
          </button>
        </h2>

        <main>
          <Form ref={formRef} onSubmit={handleUpdateEmployee}>
            <Input
              label="Nome do funcionário"
              icon={FiUser}
              name="name"
              placeholder="Insira o nome do funcionário"
            />

            <Input
              label="E-mail do funcionário"
              icon={FiUser}
              name="email"
              placeholder="Insira o e-mail do funcionário"
            />

            <InputDate
              type="date"
              label="Data de aniversário"
              icon={FiCalendar}
              name="birthday_date"
              placeholder="Insira a data de nascimento"
            />

            <InputDate
              type="date"
              label="Data de admissão"
              icon={FiCalendar}
              name="admission_date"
              placeholder="Insira a data de admissão"
            />

            <SingleSelect
              name="sector"
              onChange={({ value }) => {
                formRef.current?.setFieldValue('sector', value)
              }}
              options={[
                {
                  label: 'Engenharia',
                  value: 'engenharia',
                },
                {
                  label: 'Compras',
                  value: 'compras',
                },
                {
                  label: 'Vendas',
                  value: 'vendas',
                },
                {
                  label: 'Financeiro',
                  value: 'financeiro',
                },
              ]}
              label="Setor do funcionário"
              placeholder={
                employee.sector || 'Selecione o setor do funcionário'
              }
            />

            <SingleSelect
              name="office"
              onChange={({ value }) => {
                formRef.current?.setFieldValue('office', value)
              }}
              options={[
                {
                  label: 'Auxiliar',
                  value: 'auxiliar',
                },
                {
                  label: 'Técnico',
                  value: 'tecnico',
                },
                {
                  label: 'Engenheiro',
                  value: 'engenheiro',
                },
                {
                  label: 'Diretor',
                  value: 'diretor',
                },
              ]}
              label="Cargo do Funcionário"
              placeholder={
                employee.office || 'Selecione o cargo do funcionário'
              }
            />

            <SingleSelect
              name="level"
              onChange={({ value }) => {
                formRef.current?.setFieldValue('level', value)
              }}
              options={[
                {
                  label: 'Junior',
                  value: 'junior',
                },
                {
                  label: 'Pleno',
                  value: 'pleno',
                },
                {
                  label: 'Senior',
                  value: 'senior',
                },
                {
                  label: 'Estagiario',
                  value: 'estagiario',
                },
              ]}
              label="Nível do Funcionário"
              placeholder={employee.level || 'Selecione o nível do funcionário'}
            />

            <Button type="submit">Salvar alterações</Button>
          </Form>
        </main>
      </Container>
      <Overlay onClick={handleToggleModal} />

      <ModalConfirm
        executeConfirmed={handleDeleteEmployee}
        data={modalConfirm}
        setData={setModalConfirm}
      />
    </>
  )
}

export default ModalEditEmployee
