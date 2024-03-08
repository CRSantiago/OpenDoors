import React, { useState } from 'react'
import { FormInput, FormLabel, FormButton } from '../../components'
import { submitRegistrationForm } from '../api'

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    // confirmPassword: '',
  })
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(formData)
    submitRegistrationForm(formData)
      .then((response) => {
        console.log(response)
      })
      .catch((error) => {
        // Handle error
      })
  }
  return (
    <div className="flex  justify-center">
      <form
        className="flex flex-col w-1/4 bg-neutral-100 p-10 shadow-lg rounded-lg"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-10">Register</h2>
        <FormLabel htmlFor="username" text="Username" />
        <FormInput
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
        <FormLabel htmlFor="email" text="Email" />
        <FormInput
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <FormLabel htmlFor="password" text="Password" />
        <FormInput
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        {/* <FormLabel htmlFor="confirmPassword" text="Confirm Password" />
        <FormInput
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
        /> */}
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
