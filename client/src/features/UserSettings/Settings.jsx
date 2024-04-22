import React, { useState } from "react"
import { FormInput, FormLabel, FormButton } from "../components"
import { useAuth } from "../../AuthContext"
import { isValidEmail, isValidUsername, isPasswordStrong } from "../Auth/utils"
import { updateUserData } from "./api/updateUser"

const Settings = () => {
  const { user, updateUser } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    username: user.username,
    email: user.email,
  })

  const [fieldErrors, setFieldErrors] = useState({
    username: "",
    email: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleEditToggle = () => {
    setIsEditing((prevState) => !prevState)
  }

  const validateFormData = () => {
    if (!isValidUsername(formData.username)) {
      setFieldErrors((errors) => ({
        ...errors,
        username:
          "Enter a valid username. It must be 3-20 characters long and contain only letters, numbers, underscores, or dashes.",
      }))
      return false
    } else {
      setFieldErrors((errors) => ({
        ...errors,
        username: "",
      }))
    }
    if (!isValidEmail(formData.email)) {
      setFieldErrors((errors) => ({
        ...errors,
        email: "Enter a valid email.",
      }))
      return false
    } else {
      setFieldErrors((errors) => ({
        ...errors,
        email: "",
      }))
    }

    return true
  }

  const handleUpdate = () => {
    if (validateFormData()) {
      updateUserData(formData)
        .then(() => {
          updateUser(formData)
          handleEditToggle()
        })
        .catch((error) => {
          console.error("Error creating job application", error)
        })
    }
  }

  return (
    <div className="max-w-lg mx-auto p-8 bg-white shadow-lg rounded-lg mt-8">
      <h2 className="text-2xl font-semibold text-gray-900 mb-4">
        User Settings
      </h2>
      <div className="mb-4">
        <FormLabel
          styles="block text-sm font-medium text-gray-700"
          text="Username"
          htmlFor="username"
        />
        {isEditing ? (
          <FormInput
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            error={fieldErrors.username}
          />
        ) : (
          <p className="mt-1 text-lg text-gray-900">{user.username}</p>
        )}
      </div>
      <div className="mb-6">
        <FormLabel
          styles="block text-sm font-medium text-gray-700"
          text="Email"
          htmlFor="Email"
        />
        {isEditing ? (
          <FormInput
            type="text"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            errors={fieldErrors.email}
          />
        ) : (
          <p className="mt-1 text-lg text-gray-900">{user.email}</p>
        )}
      </div>
      <div className="flex gap-4">
        {isEditing ? (
          <>
            <FormButton
              type="submit"
              styles=" flex-1 bg-green-500 hover:bg-green-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-md text-sm py-2 px-4"
              text="Save"
              handleClick={handleUpdate}
            />
            <FormButton
              type="button"
              handleClick={handleEditToggle}
              text="Cancel"
              styles=" flex-1 bg-red-500 hover:bg-red-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-md text-sm py-2 px-4"
            />
          </>
        ) : (
          <>
            <FormButton
              type="button"
              text="Edit Information"
              handleClick={handleEditToggle}
              styles="flex-1 text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-md text-sm py-2 px-4"
            />
            <FormButton
              type="button"
              text="Change Password"
              styles="flex-1 text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded-md text-sm py-2 px-4"
            />
          </>
        )}
      </div>
    </div>
  )
}

export default Settings
