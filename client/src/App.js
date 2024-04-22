import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navbar from "./components/NavBar"
import AnimatedBackground from "./components/AnimatedBackground"
import ProtectedRoute from "./components/ProtectedRoute"
import LandingPage from "./features/LandingPage/LandingPage"
import ContributionsPage from "./features/ContributionsPage/ContributionsPage"
import Dashboard from "./features/Dashboard/Dashboard"
import AuthPage from "./features/Auth/AuthPage"
import Settings from "./features/UserSettings/Settings"
import { AuthProvider } from "./AuthContext"

import "./index.css"

function App() {
  return (
    <AuthProvider>
      <Router>
        <div>
          <AnimatedBackground />
          <Navbar />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/contributions" element={<ContributionsPage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/settings" element={<Settings />} />
            </Route>
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App
