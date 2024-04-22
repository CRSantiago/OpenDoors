// ProtectedRoute.js
import React from "react"
import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../AuthContext"

const ProtectedRoute = () => {
  const { user, logout } = useAuth()

  function isTokenExpired() {
    const expirationTime = localStorage.getItem("tokenExpiration")
    const currentTime = Date.now()
    return currentTime > expirationTime
  }

  // if a user is logged in, and has a valid token (i.e. not expired) then render protected route, else redirect login page
  if (user && !isTokenExpired()) {
    return <Outlet />
  } else {
    return <Navigate to="/auth" />
  }
}

export default ProtectedRoute
