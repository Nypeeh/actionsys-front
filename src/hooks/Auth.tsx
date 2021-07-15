import { createContext, useCallback, useContext, useState } from 'react'
import api from '../services/api'
import Cookies from 'js-cookie'

interface AuthState {
  token: string
  user: Record<string, unknown>
}

interface SignInProps {
  email: string
  password: string
}

interface SignUpProps {
  name: string
  email: string
  password: string
}

interface AuthContextData {
  signIn(credentials: SignInProps): Promise<void>
  signUp(credentials: SignUpProps): Promise<void>
  signOut(): void
  user: Record<string, unknown>
  token: string
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = Cookies.get('@GoBarber:token')
    const user = Cookies.get('@GoBarber:user')

    if (token && user) {
      return { token, user: JSON.parse(user) }
    }

    return {} as AuthState
  })

  const signIn = useCallback(async ({ email, password }: SignInProps) => {
    const response = await api.post('sessions', {
      email,
      password,
    })

    const { token, user } = response.data

    Cookies.set('@GoBarber:token', token)
    Cookies.set('@GoBarber:user', JSON.stringify(user))

    setData({ token, user })
  }, [])

  const signUp = useCallback(async ({ name, email, password }: SignUpProps) => {
    const response = await api.post('users', {
      name,
      email,
      password,
    })

    const { token, user } = response.data

    Cookies.set('@GoBarber:token', token)
    Cookies.set('@GoBarber:user', JSON.stringify(user))

    setData({ token, user })
  }, [])

  const signOut = useCallback(() => {
    Cookies.remove('@GoBarber:token')
    Cookies.remove('@GoBarber:user')

    setData({} as AuthState)
  }, [])

  return (
    <AuthContext.Provider
      value={{ user: data.user, token: data.token, signIn, signUp, signOut }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}
