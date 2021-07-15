import { FiLock, FiMail } from 'react-icons/fi'
import { Form } from '@unform/web'
import { useRouter } from 'next/dist/client/router'

import Input from '../components/Inputs/Input'

import { Container, BoxLogin } from '../styles/Home'
import Button from '../components/Button'
import { useCallback, useRef } from 'react'
import { FormHandles } from '@unform/core'
import * as Yup from 'yup'
import { useToast } from '../hooks/Toast'
import { useAuth } from '../hooks/Auth'
import { getValidationErrors } from '../utils/getValidationErrors'

interface SignInFormData {
  email: string
  password: string
}

const Home: React.FC = () => {
  const router = useRouter()
  const { signIn } = useAuth()
  const { addToast } = useToast()

  const formRef = useRef<FormHandles>(null)
  const handleSubmit = useCallback(
    async (data: SignInFormData) => {
      try {
        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          password: Yup.string().required('Senha obrigatória'),
        })

        await schema.validate(data, {
          abortEarly: false,
        })

        formRef.current?.setErrors({})

        await signIn({
          email: data.email,
          password: data.password,
        })

        addToast({
          type: 'success',
          title: 'Logado com sucesso!',
          description: 'Você efetuou o login com sucesso!',
        })

        router.push('/dashboard')
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err)

          formRef.current?.setErrors(errors)
        } else {
          addToast({
            type: 'error',
            title: 'Erro na autenticação',
            description:
              'Ocorreu um erro ao fazer o login, cheque suas credencias.',
          })
        }
      }
    },
    [addToast, router, signIn],
  )

  return (
    <Container>
      <BoxLogin>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Input name="email" icon={FiMail} placeholder="E-mail" />
          <Input
            name="password"
            icon={FiLock}
            placeholder="Senha"
            type="password"
          />

          <Button type="submit">Logar</Button>
        </Form>
      </BoxLogin>
    </Container>
  )
}

export default Home
