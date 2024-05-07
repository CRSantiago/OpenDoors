import React, { useState } from "react"
import LoginForm from "./components/LoginForm"
import RegisterForm from "./components/RegisterForm"

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(false) // Toggle between Login and Register

  return (
    <div className="flex flex-col justify-center mt-10">
      {isLogin ? <LoginForm /> : <RegisterForm />}
      <button
        onClick={() => setIsLogin(!isLogin)}
        className="my-4 font-bold text-lg text-darkBackground hover:underline"
      >
        {isLogin
          ? "Don't have an account yet, sign up!"
          : " Already have an account? Login now!"}
      </button>
    </div>
  )
}

export default AuthPage
