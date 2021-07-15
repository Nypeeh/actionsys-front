import { AuthProvider } from './Auth'
import { EmployeeProvider } from './Employee'
import { ToastProvider } from './Toast'

export const AppProvider: React.FC = ({ children }) => {
  return (
    <AuthProvider>
      <ToastProvider>
        <EmployeeProvider>{children}</EmployeeProvider>
      </ToastProvider>
    </AuthProvider>
  )
}
