import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '@/stores/store'
import { ReactNode } from 'react'

interface ProtectedRouteProps {
  children: ReactNode
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const user = useSelector((state: RootState) => state.auth.user)

  if (!user || !user.id) {
    return <Navigate to='/login' replace />
  }

  return <>{children}</>
}

export default ProtectedRoute
