import React from 'react'
import { Outlet } from 'react-router-dom'

import { SideNavbar } from './sidebar'

export function AppLayout() {
  const [isCollapsed, setIsCollapsed] = React.useState(false)
  React.useEffect(() => {
    function handleResize() {
      const smBreakpoint = 640

      setIsCollapsed(window.innerWidth < smBreakpoint)
    }

    window.addEventListener('resize', handleResize)

    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, []) //
  return (
    <main className='flex h-full min-h-screen items-center bg-gray-100 dark:bg-slate-900'>
      <SideNavbar collapsed={isCollapsed} />
      <Outlet />
    </main>
  )
}
