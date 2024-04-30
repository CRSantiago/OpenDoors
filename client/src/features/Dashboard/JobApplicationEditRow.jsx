import React, { useState } from 'react'
import { FormInput, FormButton } from '../components'
import SuccessAnimation from './SuccessAnimation'
import checkbox_checked from './assets/checkbox_checked.svg'
import checkbox_unchecked from './assets/checkbox_unchecked.svg'
import edit_icon from './assets/edit_icon.svg'
import { updateJobApplication } from './api'
import useForm from '../../hooks/useForm'
import validateFormData from './utils/validateApplicationData'

const JobApplicationEditRow = ({
  application,
  deleteIds,
  handleApplicationSelection,
  toggleEditMode,
  fetchUserData,
}) => {
  const {
    formData,
    handleChange,
    addInterviewDate,
    removeInterviewDate,
    handleDateChange,
    resetFormData,
    fieldErrors,
    handleValidation,
  } = useForm(application, validateFormData)

  const [isSubmitted, setIsSubmitted] = useState(false)
  const statusEnum = [
    'Applied',
    'Assessment',
    'Phone Screen',
    'Interviewing',
    'Offer',
    'Accepted',
    'Rejected',
  ]

  // Handle the edit mode toggle and revert to original data
  const handleEditToggle = () => {
    toggleEditMode(application._id)
    // Revert to original data
    resetFormData(application)
  }

  const handleUpdate = (e) => {
    e.preventDefault()
    if (handleValidation()) {
      updateJobApplication(formData)
        .then((data) => {
          setIsSubmitted(true)
          setTimeout(() => {
            toggleEditMode(application._id)
            fetchUserData()
          }, 2000)
        })
        .catch((error) => {
          console.error('Error creating job application', error)
        })
    }
  }
  const isSelected = deleteIds.includes(application._id)
  return (
    <>
      {isSubmitted ? (
        <SuccessAnimation message={'Application Updated Successfully!'} />
      ) : (
        <>
          <tr className="cursor-pointer hover:bg-indigo-500 hover:text-indigo-50 even:bg-sky-100">
            {/* Checkbox */}
            <td className="py-1">
              <img
                className="w-4 cursor-pointer ml-4"
                src={isSelected ? checkbox_checked : checkbox_unchecked}
                onClick={(e) => {
                  e.stopPropagation()
                  handleApplicationSelection(application._id)
                }}
                alt="Checkbox"
              />
            </td>
            <td className="text-center px-6 py-3">
              <FormInput
                type="text"
                id="company"
                value={formData.company}
                name="company"
                onChange={handleChange}
                error={fieldErrors.company}
              />
            </td>
            <td className="text-center px-6 py-3">
              <FormInput
                type="text"
                id="jobTitle"
                value={formData.jobTitle}
                name="jobTitle"
                onChange={handleChange}
                error={fieldErrors.jobTitle}
              />
            </td>
            <td className="text-center px-6 py-3">
              <FormInput
                type="Date"
                id="dateApplied"
                name="dateApplied"
                value={
                  formData.dateApplied.substring(
                    0,
                    10
                  ) /* Display only the date*/
                }
                onChange={handleChange}
                error={fieldErrors.dateApplied}
              />
            </td>
            <td className="text-center px-6 py-3">
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="my-1 bg-slate-100 p-1 text-black"
              >
                {statusEnum.map((status, index) => (
                  <option key={index} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </td>
            <td>
              <img
                src={edit_icon}
                alt="Edit"
                className="w-4"
                onClick={handleEditToggle}
              />
            </td>
          </tr>
          <tr>
            <td colSpan="6" className="bg-gray-50 p-2 shadow-md">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <p>
                  Source:{' '}
                  <FormInput
                    id="source"
                    name="source"
                    type="text"
                    value={formData.source}
                    onChange={handleChange}
                  />
                </p>
                <p>
                  Location:{' '}
                  <FormInput
                    id="location"
                    name="location"
                    type="text"
                    value={formData.location}
                    onChange={handleChange}
                  />
                </p>
                <p>
                  Contact Email:{' '}
                  <FormInput
                    id="contactEmail"
                    name="contactEmail"
                    type="email"
                    value={formData.contactEmail}
                    onChange={handleChange}
                  />
                </p>
                <p>
                  Contact Phone:{' '}
                  <FormInput
                    id="contactPhone"
                    name="contactPhone"
                    type="tel"
                    value={formData.contactPhone}
                    onChange={handleChange}
                  />
                </p>
                <div className="flex flex-col">
                  <p>
                    Interview Dates:{' '}
                    {formData.interviewDates
                      .map((date) => date.substring(0, 10))
                      .join(', ')}
                  </p>
                  <button
                    type="button"
                    onClick={addInterviewDate}
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-2 rounded transition duration-150 ease-in-out w-1/3 mb-3"
                  >
                    Add Interview Date
                  </button>
                  {formData.interviewDates.map((date, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-2 mb-3"
                    >
                      <input
                        type="date"
                        value={date.substring(0, 10)}
                        onChange={(e) => handleDateChange(e, index)}
                        className="mt-1"
                      />
                      <button
                        type="button"
                        onClick={() => removeInterviewDate(index)}
                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded transition duration-150 ease-in-out"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
                <p>
                  Notes:{' '}
                  <textarea
                    id="notes"
                    name="notes"
                    rows="4"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                    placeholder="Add any additional notes here..."
                    value={formData.notes}
                    onChange={handleChange}
                  ></textarea>
                </p>
              </div>
              <div className="flex justify-center mt-3">
                <FormButton
                  type="submit"
                  styles="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-150 ease-in-out mr-4"
                  text="Save"
                  handleClick={handleUpdate}
                />
                <FormButton
                  type="button"
                  handleClick={handleEditToggle}
                  text="Cancel"
                  styles="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition duration-150 ease-in-out"
                />
              </div>
            </td>
          </tr>
        </>
      )}
    </>
  )
}

export default JobApplicationEditRow
