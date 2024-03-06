import React, { useState } from "react"
import LoginForm from "./components/LoginForm"
import RegisterForm from "./components/RegisterForm"

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true) // Toggle between Login and Register

  return (
    <div>
      <h2>{isLogin ? "Login" : "Register"}</h2>
      <button onClick={() => setIsLogin(!isLogin)}>
        Switch to {isLogin ? "Register" : "Login"}
      </button>
      {isLogin ? <LoginForm /> : <RegisterForm />}
    </div>
  )
}

export default AuthPage
