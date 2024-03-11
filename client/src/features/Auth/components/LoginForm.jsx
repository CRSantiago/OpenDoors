import React, { useState } from 'react'
import { FormInput, FormLabel, FormButton } from '../../components'
import { submitLoginForm } from '../api'

const LoginForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  })

  const [fieldErrors, setFieldErrors] = useState({
    username: '',
    password: '',
  })

  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleFormResponse = (response) => {
    if (response.token) {
      setSuccessMessage('Login successful')
      setErrorMessage('')
      setFieldErrors({ username: '', password: '' })
    } else if (response.message.includes('Authentication failed')) {
      if (response.message.includes('User does not exist')) {
        setFieldErrors((errors) => ({
          ...errors,
          username: 'User does not exist',
        }))
      } else {
        setFieldErrors((errors) => ({
          ...errors,
          username: '',
        }))
      }

      if (response.message.includes('Invalid password')) {
        setFieldErrors((errors) => ({
          ...errors,
          password: 'Invalid password',
        }))
      } else {
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
    <div className="flex  justify-center">
      <form
        className="flex flex-col w-1/3 bg-neutral-100 p-10 shadow-lg rounded-lg"
        onSubmit={handleSubmit}
      >
        {successMessage && <h3 className="text-green-500">{successMessage}</h3>}
        {errorMessage && <h3 className="text-red-500">{errorMessage}</h3>}
        <h2 className="text-2xl font-bold mb-4">Login</h2>
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
          styles="bg-indigo-500 text-white font-bold py-2 px-4 rounded hover:bg-indigo-600 mt-4"
        />
      </form>
    </div>
  )
}

export default LoginForm
