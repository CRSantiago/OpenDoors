import React, { useState } from 'react'
import { FormButton, FormInput, FormLabel } from '../components'
import { isPasswordStrong } from '../Auth/utils'
import { changePassword } from './api/changePassword'

function PasswordModal({ isOpen, onClose }) {
  // Allow the user to toggle the visibility of the password fields
  const [showPassword, setShowPassword] = useState(false)

  const togglePasswordVisibility = () =>
    setShowPassword((prevState) => !prevState)

  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  })

  const [fieldErrors, setFieldErrors] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const validateFormData = () => {
    if (!isPasswordStrong(formData.newPassword)) {
      setFieldErrors((errors) => ({
        ...errors,
        newPassword:
          'At least one uppercase letter. At least one lowercase letter. At least one digit. At least one special character. Minimum eight characters in length',
      }))
      return false
    } else {
      setFieldErrors((errors) => ({
        ...errors,
        newPassword: '',
      }))
    }

    if (formData.newPassword !== formData.confirmNewPassword) {
      setFieldErrors((errors) => ({
        ...errors,
        confirmNewPassword: 'Passwords do not match.',
      }))
      return false
    } else {
      setFieldErrors((errors) => ({
        ...errors,
        confirmNewPassword: '',
      }))
    }

    return true
  }

  const handleFormResponse = (response) => {
    if (response.message === 'Password successfully updated.') {
      setFormData({
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: '',
      })
      onClose()
    } else {
      setFieldErrors((errors) => ({
        ...errors,
        currentPassword: 'Current password is incorrect.',
      }))
    }
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if (validateFormData()) {
      const newFormData = {
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
      }
      changePassword(newFormData)
        .then((response) => {
          handleFormResponse(response)
          onClose(true)
        })
        .catch((error) => {
          console.error(error)
        })
    }
  }

  // return null if the modal is not open so that it doesn't render
  if (!isOpen) return null
  return (
    <div
      className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
      onClick={onClose}
    >
      <div
        className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-semibold text-gray-900">Change Password</h2>
        <form className="space-y-4" onSubmit={onSubmit}>
          <div>
            <FormLabel
              htmlFor={'currentPassword'}
              text={'Current Password'}
              styles={'block text-sm font-medium text-gray-700'}
            />
            <div className="mt-1 relative flex items-start">
              <FormInput
                type={showPassword ? 'text' : 'password'}
                id="currentPassword"
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleChange}
                error={fieldErrors.currentPassword}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex mt-2 text-sm leading-5 "
                onClick={togglePasswordVisibility}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>
          <div>
            <FormLabel
              htmlFor={'newPassword'}
              text={'New Password'}
              styles={'block text-sm font-medium text-gray-700'}
            />
            <div className="mt-1 relative flex items-start">
              <FormInput
                type={showPassword ? 'text' : 'password'}
                id="newPassword"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                error={fieldErrors.newPassword}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex text-sm leading-5 mt-2"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>
          <div>
            <FormLabel
              htmlFor={'confirmNewPassword'}
              text={'Confirm New Password'}
              styles={'block text-sm font-medium text-gray-700'}
            />
            <div className="mt-1 relative flex items-start">
              <FormInput
                type={showPassword ? 'text' : 'password'}
                id="confirmNewPassword"
                name="confirmNewPassword"
                value={formData.confirmNewPassword}
                onChange={handleChange}
                error={fieldErrors.confirmNewPassword}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex mt-2 text-sm leading-5"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>
          <div className="flex justify-end space-x-4">
            <FormButton
              type="button"
              text="Cancel"
              handleClick={onClose}
              styles="py-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
            />
            <FormButton
              type="submit"
              text="Change"
              styles="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            />
          </div>
        </form>
      </div>
    </div>
  )
}

export default PasswordModal
