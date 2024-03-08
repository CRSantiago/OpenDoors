import React, { useState } from 'react'
import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true) // Toggle between Login and Register

  return (
    <div className="flex flex-col justify-center">
      {isLogin ? <LoginForm /> : <RegisterForm />}
      <button
        onClick={() => setIsLogin(!isLogin)}
        className="mt-4 font-bold text-lg"
      >
        {isLogin
          ? "Don't have an account yet, sign up!"
          : ' Already have an account? Login now!'}
      </button>
    </div>
  )
}

export default AuthPage
