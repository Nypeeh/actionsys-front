import { useCallback, useRef } from 'react'
import * as Yup from 'yup'
import { addDays } from 'date-fns'
import { Form } from '@unform/web'
import { FaTimes } from 'react-icons/fa'
import { FormHandles } from '@unform/core'
import { FiCalendar, FiLock, FiUser } from 'react-icons/fi'

// Components
import Input from '../Inputs/Input'
import SingleSelect from '../Inputs/Select'
import InputDate from '../Inputs/InputDate'
import Button from '../Button'

import api from '../../services/api'
import { Container, Overlay } from './styles'
import { useToast } from '../../hooks/Toast'
import { useAuth } from '../../hooks/Auth'
import { useEmployee } from '../../hooks/Employee'
import { getValidationErrors } from '../../utils/getValidationErrors'

interface SubmitChangeProps {
  name: string
  email: string
  sector: string
  birthday_date: string
  admission_date: string
  office: string
  level: string
}

interface ModalAddEmployeeProps {
  handleToggleModal(): void
}

const ModalAddEmployee: React.FC<ModalAddEmployeeProps> = ({
  handleToggleModal,
}) => {
  const { token } = useAuth()
  const { addToast } = useToast()
  const { addEmployee } = useEmployee()
  const formRef = useRef<FormHandles>(null)

  const handleAddEmployee = useCallback(
    async (values: SubmitChangeProps) => {
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
          password: Yup.string().required('Senha obrigatória'),
          sector: Yup.string().required('Setor obrigatório'),
          office: Yup.string().required('Cargo obrigatório'),
          level: Yup.string().required('Nível obrigatório'),
          admission_date: Yup.string().required('Data admissão obrigatória'),
          birthday_date: Yup.string().required('Aniversário obrigatório'),
        })

        await schema.validate(formData, {
          abortEarly: false,
        })

        formRef.current?.setErrors({})

        const { data } = await api.post('employees', formData, {
          headers: { authorization: `Bearer ${token}` },
        })

        addToast({
          type: 'success',
          title: 'Funcionário adicionado com sucesso!',
        })

        addEmployee(data)
        handleToggleModal()
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
            title: 'Houve um problema ao adicionar um usuário!',
          })
        }
      }
    },
    [addEmployee, addToast, handleToggleModal, token],
  )
  return (
    <>
      <Container>
        <button type="button" onClick={handleToggleModal}>
          <FaTimes />
        </button>

        <h2>Adicionando um novo funcionário</h2>

        <main>
          <Form ref={formRef} onSubmit={handleAddEmployee}>
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

            <Input
              label="Senha do funcionário"
              icon={FiLock}
              name="password"
              type="password"
              placeholder="Insira a senha do funcionário"
            />

            <InputDate
              type="date"
              label="Data de aversário"
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
              placeholder="Selecione o setor do funcionário"
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
              placeholder="Selecione o cargo do funcionário"
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
              placeholder="Selecione o nível do funcionário"
            />

            <Button type="submit">Salvar funcionário</Button>
          </Form>
        </main>
      </Container>
      <Overlay onClick={handleToggleModal} />
    </>
  )
}

export default ModalAddEmployee
