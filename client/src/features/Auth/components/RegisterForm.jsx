import React, { useState } from 'react'
import { FormInput, FormLabel, FormButton } from '../../components'
import { submitRegistrationForm } from '../api'
import { isValidEmail, isValidUsername, isPasswordStrong } from '../utils'
import useForm from '../../../hooks/useForm'

const RegisterForm = () => {
  const initialFormData = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  }

  const { formData, handleChange } = useForm(initialFormData)

  const [fieldErrors, setFieldErrors] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const validateFormData = () => {
    if (!isValidUsername(formData.username)) {
      setFieldErrors((errors) => ({
        ...errors,
        username:
          'Enter a valid username. It must be 3-20 characters long and contain only letters, numbers, underscores, or dashes.',
      }))
      return false
    } else {
      setFieldErrors((errors) => ({
        ...errors,
        username: '',
      }))
    }
    if (!isValidEmail(formData.email)) {
      setFieldErrors((errors) => ({
        ...errors,
        email: 'Enter a valid email.',
      }))
      return false
    } else {
      setFieldErrors((errors) => ({
        ...errors,
        email: '',
      }))
    }

    if (!isPasswordStrong(formData.password)) {
      setFieldErrors((errors) => ({
        ...errors,
        password:
          'At least one uppercase letter. At least one lowercase letter. At least one digit. At least one special character. Minimum eight characters in length',
      }))
      return false
    } else {
      setFieldErrors((errors) => ({
        ...errors,
        password: '',
      }))
    }
    if (formData.password !== formData.confirmPassword) {
      setFieldErrors((errors) => ({
        ...errors,
        confirmPassword: 'Passwords do not match.',
      }))
      return false
    } else {
      setFieldErrors((errors) => ({
        ...errors,
        confirmPassword: '',
      }))
    }

    return true
  }

  const handleFormResponse = (response) => {
    if (response.message === 'User created successfully') {
      setSuccessMessage('Successfully created an account!')
      setErrorMessage('')
    } else if (
      response.message.includes('duplicate') &&
      response.message.includes('username')
    ) {
      setErrorMessage('There already exist an account with this username.')
    } else if (
      response.message.includes('duplicate') &&
      response.message.includes('email')
    ) {
      setErrorMessage('There already exist an account with this email.')
    } else {
      setErrorMessage(response.message)
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateFormData()) {
      const newFormData = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      }
      submitRegistrationForm(newFormData)
        .then(handleFormResponse)
        .catch((error) => {
          setErrorMessage(error)
        })
    }
    return
  }
  return (
    <div className="flex  justify-center">
      <form
        className="flex flex-col w-1/3 bg-neutral-100 p-10 shadow-lg rounded-lg"
        onSubmit={handleSubmit}
      >
        {successMessage && <h3 className="text-green-500">{successMessage}</h3>}
        {errorMessage && <h3 className="text-red-500">{errorMessage}</h3>}
        <h2 className="text-2xl font-bold mb-4">Register</h2>
        <FormLabel htmlFor="username" text="Username" />
        <FormInput
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          error={fieldErrors.username}
        />
        <FormLabel htmlFor="email" text="Email" />
        <FormInput
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          error={fieldErrors.email}
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
        <FormLabel htmlFor="confirmPassword" text="Confirm Password" />
        <FormInput
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          error={fieldErrors.confirmPassword}
        />
        <FormButton
          type="submit"
          text="Register"
          styles="bg-indigo-500 text-white font-bold py-2 px-4 rounded hover:bg-indigo-600 mt-4"
        />
      </form>
    </div>
  )
}

export default RegisterForm
