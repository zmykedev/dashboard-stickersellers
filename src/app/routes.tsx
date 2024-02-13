import { useRoutes } from 'react-router-dom'

import { AppLayout, AuthLayout } from '@/components/layouts'
// import { withAdmin, withLoggedIn, withLoggedOut } from '@/hooks/AuthContext'
import Error404 from '@/pages/404'
import { AdminDashboard } from '@/pages/admin'
import { Login, Recovery, Register, ResetPassword } from '@/pages/auth'
import Home from '@/pages/home'
import { UserDashboard } from '@/pages/users'

export const AppRoutes = () => {
  return useRoutes([
    { path: '/', element: <Home /> },
    {
      element: <AuthLayout />,
      children: [
        { path: 'register', element: <Register /> },
        { path: 'login', element: <Login /> },
        { path: 'recovery', element: <Recovery /> },
        { path: 'reset-password', element: <ResetPassword /> },
      ],
    },
    {
      element: <AppLayout />,
      children: [
        { path: 'dashboard', element: <UserDashboard /> },
        { path: 'admin', element: <AdminDashboard /> },
      ],
    },
    { path: '*', element: <Error404 /> },
  ])
}
