import { ElementType, useEffect } from 'react'
import router from 'next/router'
import { useAuth } from '../hooks/Auth'

export function withAuth(WrappedComponent: ElementType) {
  const Wrapper = (props: unknown) => {
    const { token } = useAuth()

    useEffect(() => {
      if (!token) {
        router.replace('/')
      }
    }, [token])

    return <WrappedComponent {...props} />
  }

  return Wrapper
}
