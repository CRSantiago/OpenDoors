import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navbar from "./components/NavBar"
import LandingPage from "./features/LandingPage/LandingPage"
import ContributionsPage from "./features/ContributionsPage/ContributionsPage"
import AuthPage from "./features/Auth/AuthPage"

import "./index.css"

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/contributions" element={<ContributionsPage />} />
          <Route path="/auth" element={<AuthPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
