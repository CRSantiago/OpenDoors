import React, { useState } from "react"
import { FormInput, FormLabel, FormButton } from "../../components"
import { submitRegistrationForm } from "../api"
import { validateFormData } from "../utils"
import useForm from "../../../hooks/useForm"

const RegisterForm = () => {
  const initialFormData = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  }

  const { formData, handleChange, fieldErrors, handleValidation } = useForm(
    initialFormData,
    validateFormData
  )

  const [successMessage, setSuccessMessage] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  const handleFormResponse = (response) => {
    if (response.message === "User created successfully") {
      setSuccessMessage("Successfully created an account!")
      setErrorMessage("")
    } else if (
      response.message.includes("duplicate") &&
      response.message.includes("username")
    ) {
      setErrorMessage("There already exist an account with this username.")
    } else if (
      response.message.includes("duplicate") &&
      response.message.includes("email")
    ) {
      setErrorMessage("There already exist an account with this email.")
    } else {
      setErrorMessage(response.message)
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    if (handleValidation()) {
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
