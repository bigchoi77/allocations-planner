import { useEffect } from 'react'

import { navigate, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

import { useAuth } from 'src/auth'
import Navbar from 'src/components/Navbar/Navbar'

const UnauthorizedPage = () => {
  const { isAuthenticated } = useAuth()
  useEffect(() => {
    if (isAuthenticated) navigate(routes.allocations())
  })
  return (
    <div className="not-found">
      <Metadata title="Unauthorized" description="Unauthorized page" />
      <Navbar />
    </div>
  )
}

export default UnauthorizedPage
