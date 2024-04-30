import React, { useState } from 'react'
import { FormInput, FormLabel, FormButton } from '../components'
import { useAuth } from '../../AuthContext'
import { updateUserData } from './api/updateUser'
import PasswordModal from './PasswordModal'
import SuccessAnimation from '../Dashboard/SuccessAnimation'
import useForm from '../../hooks/useForm'
import validateFormData from './utils/validateUserInfo'

const Settings = () => {
  const { user, updateUser } = useAuth()
  const [isEditing, setIsEditing] = useState(false)

  const initialFormData = {
    username: user.username,
    email: user.email,
  }

  const {
    formData,
    handleChange,
    resetFormData,
    fieldErrors,
    handleValidation,
  } = useForm(initialFormData, validateFormData)

  const [showPasswordModal, setShowPasswordModal] = useState(false)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const handleModalClose = (showSuccess = false) => {
    setShowPasswordModal(false)
    if (showSuccess) {
      setShowSuccessMessage(true)
      setTimeout(() => {
        setShowSuccessMessage(false)
      }, 2000) // Display success message for 2 seconds
    }
  }

  const handleModalOpen = () => setShowPasswordModal(true)

  const handleEditToggle = () => {
    setIsEditing((prevState) => !prevState)
    if (!isEditing) {
      resetFormData(initialFormData)
    }
  }

  const handleUpdate = (e) => {
    e.preventDefault()
    if (handleValidation()) {
      updateUserData(formData)
        .then(() => {
          updateUser(formData)
          handleEditToggle()
        })
        .catch((error) => {
          console.error('Error creating job application', error)
        })
    }
  }

  return (
    <>
      {showPasswordModal && (
        <PasswordModal isOpen={showPasswordModal} onClose={handleModalClose} />
      )}

      {showSuccessMessage && (
        <SuccessAnimation message={'Password successfully updated!'} />
      )}
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
              error={fieldErrors.email}
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
                handleClick={handleModalOpen}
              />
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default Settings
