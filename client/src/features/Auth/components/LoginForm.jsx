import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FormInput, FormLabel, FormButton } from '../../components'
import { submitLoginForm } from '../api'
import { useAuth } from '../../../AuthContext'
import useForm from '../../../hooks/useForm'

const LoginForm = () => {
  // Get the login function from the AuthContext
  const { login } = useAuth()
  const navigate = useNavigate()

  const initialFormData = {
    username: '',
    password: '',
  }

  const { formData, handleChange } = useForm(initialFormData)

  // Store field errors to display in the form
  const [fieldErrors, setFieldErrors] = useState({
    username: '',
    password: '',
  })

  const [errorMessage, setErrorMessage] = useState('')

  // Handle the response from the server
  const handleFormResponse = (response) => {
    if (response.token) {
      login(response) // Store user object in context
      setErrorMessage('') // Clear any previous error messages
      setFieldErrors({ username: '', password: '' }) // Clear any previous field errors
      navigate('/dashboard') // Redirect to the dashboard
    } else if (response.message.includes('Authentication failed')) {
      if (response.message.includes('User does not exist')) {
        // Set the username error if the user does not exist
        setFieldErrors((errors) => ({
          ...errors,
          username: 'User does not exist',
        }))
      } else {
        // Clear the username error if the user exists
        setFieldErrors((errors) => ({
          ...errors,
          username: '',
        }))
      }

      if (response.message.includes('Invalid password')) {
        // Set the password error if the password is invalid
        setFieldErrors((errors) => ({
          ...errors,
          password: 'Invalid password',
        }))
      } else {
        // Clear the password error if the password is valid
        setFieldErrors((errors) => ({
          ...errors,
          password: '',
        }))
      }
    } else {
      setErrorMessage(response.message)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    submitLoginForm(formData)
      .then(handleFormResponse)
      .catch((error) => {
        setErrorMessage(error)
      })
  }
  return (
    <div className="flex justify-center p-4">
      <form
        className="flex flex-col w-full max-w-md bg-secondary text-textPrimary p-6 shadow-lg rounded-lg"
        onSubmit={handleSubmit}
      >
        {errorMessage && <h3 className="text-red-500">{errorMessage}</h3>}
        <h2 className="text-xl sm:text-2xl font-bold mb-4">Login</h2>
        <FormLabel htmlFor="username" text="Username" />
        <FormInput
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          error={fieldErrors.username}
        />
        <FormLabel htmlFor="password" text="Password" />
        <FormInput
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          error={fieldErrors.password}
        />
        <FormButton
          type="submit"
          text="Login"
          styles="bg-brightHighlight text-white font-bold py-2 px-4 rounded hover:bg-complementary mt-4"
        />
      </form>
    </div>
  )
}

export default LoginForm
