// ProtectedRoute.js
import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../AuthContext'

const ProtectedRoute = () => {
  const { user } = useAuth()

  // If the user is logged in, render the protected route, else redirect to the login page
  return user ? <Outlet /> : <Navigate to="/auth" />
}

export default ProtectedRoute
