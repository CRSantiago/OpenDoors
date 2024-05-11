import React, { useState } from 'react'
import { FormLabel, FormInput, FormButton } from '../components'
import x_solid from './assets/xmark_solid.svg'
import SuccessAnimation from './SuccessAnimation'
import { createJobApplication } from './api'
import useForm from '../../hooks/useForm'
import validateFormData from './utils/validateApplicationData.js'

const CreateJobApplicationForm = ({ setIsCreating, fetchUserData }) => {
  const statusEnum = [
    'Applied',
    'Assessment',
    'Phone Screen',
    'Interviewing',
    'Offer',
    'Accepted',
    'Rejected',
  ]
  const initialFormData = {
    company: '',
    jobTitle: '',
    dateApplied: '',
    status: statusEnum[0],
    source: '',
    location: '',
    notes: '',
    contactEmail: '',
    contactPhone: '',
    interviewDates: [],
  }

  const {
    formData,
    handleChange,
    addInterviewDate,
    removeInterviewDate,
    handleDateChange,
    resetFormField,
    fieldErrors,
    handleValidation,
  } = useForm(initialFormData, validateFormData)

  const [fieldVisibility, setFieldVisibility] = useState({
    source: false,
    location: false,
    notes: false,
    contactEmail: false,
    contactPhone: false,
    interviewDates: false,
  })

  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleFieldVisibility = (fieldName) => {
    setFieldVisibility((prevState) => ({
      ...prevState,
      [fieldName]: !prevState[fieldName],
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (handleValidation()) {
      createJobApplication(formData)
        .then((data) => {
          setIsSubmitted(true)
          setTimeout(() => {
            setIsCreating(false)
            fetchUserData()
          }, 2000)
        })
        .catch((error) => {
          console.error('Error creating job application', error)
        })
    }
  }

  return (
    <>
      {isSubmitted ? (
        <SuccessAnimation message={'Form Submitted Successfully!'} />
      ) : (
        <form
          className="w-full sm:w-2/3 md:w-1/3 max-h-[90vh] overflow-y-auto fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-white p-5 rounded-md shadow-lg"
          onSubmit={handleSubmit}
        >
          <div className="flex justify-between mb-3 font-semibold">
            <h2 className="text-lg">Create Job Application Form</h2>
            <img
              className="w-4 cursor-pointer"
              src={x_solid}
              alt="Close"
              onClick={() => setIsCreating(false)}
            />
          </div>
          <FormLabel htmlFor="company" text="Company Name" />
          <FormInput
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            error={fieldErrors.company}
          />
          <FormLabel htmlFor="jobTitle" text="Job Title" />
          <FormInput
            type="text"
            id="jobTitle"
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleChange}
            error={fieldErrors.jobTitle}
          />
          <FormLabel htmlFor="dateApplied" text="Date Applied" />
          <FormInput
            type="Date"
            id="dateApplied"
            name="dateApplied"
            value={formData.dateApplied}
            onChange={handleChange}
            error={fieldErrors.dateApplied}
          />
          <div className="flex flex-col">
            <FormLabel htmlFor="status" text="Status" />
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="my-1 bg-slate-100 p-1"
            >
              {statusEnum.map((status, index) => (
                <option key={index} value={status}>
                  {status}
                </option>
              ))}
            </select>
            {fieldVisibility.source && (
              <div className=" mt-2">
                <div className="flex justify-between">
                  <FormLabel htmlFor="source" text="Source" />
                  <img
                    src={x_solid}
                    alt="Close"
                    onClick={() => {
                      handleFieldVisibility('source')
                      resetFormField('source')
                    }}
                    className="w-2 cursor-pointer"
                  />
                </div>
                <FormInput
                  id="source"
                  name="source"
                  value={formData.source}
                  onChange={handleChange}
                  error={fieldErrors.source}
                />
              </div>
            )}
            {!fieldVisibility.source && (
              <button
                type="button"
                onClick={() => handleFieldVisibility('source')}
                className="bg-green-600 rounded-md p-1 my-2 cursor-pointer hover:opacity-50 text-white"
              >
                Add Source
              </button>
            )}
            {fieldVisibility.location && (
              <div className=" mt-2">
                <div className="flex justify-between">
                  <FormLabel htmlFor="location" text="Location" />
                  <img
                    src={x_solid}
                    alt="Close"
                    onClick={() => {
                      handleFieldVisibility('location')
                      resetFormField('location')
                    }}
                    className="w-2 cursor-pointer"
                  />
                </div>
                <FormInput
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  error={fieldErrors.location}
                />
              </div>
            )}
            {!fieldVisibility.location && (
              <button
                type="button"
                onClick={() => handleFieldVisibility('location')}
                className="bg-green-600 rounded-md p-1 my-2 cursor-pointer hover:opacity-50 text-white"
              >
                Add Location
              </button>
            )}
            {fieldVisibility.contactEmail && (
              <div className=" mt-2">
                <div className="flex justify-between">
                  <FormLabel htmlFor="contactEmail" text="Contact Email" />
                  <img
                    src={x_solid}
                    alt="Close"
                    onClick={() => {
                      handleFieldVisibility('contactEmail')
                      resetFormField('contactEmail')
                    }}
                    className="w-2 cursor-pointer"
                  />
                </div>
                <FormInput
                  id="contactEmail"
                  name="contactEmail"
                  value={formData.contactEmail}
                  onChange={handleChange}
                  error={fieldErrors.contactEmail}
                />
              </div>
            )}
            {!fieldVisibility.contactEmail && (
              <button
                type="button"
                onClick={() => handleFieldVisibility('contactEmail')}
                className="bg-green-600 rounded-md p-1 my-2 cursor-pointer hover:opacity-50 text-white"
              >
                Add Contact Email
              </button>
            )}
            {fieldVisibility.interviewDates && (
              <div className=" mt-2">
                <div className="flex justify-between">
                  <FormLabel htmlFor="interviewDates" text="Interview Dates" />
                  <img
                    src={x_solid}
                    alt="Close"
                    onClick={() => {
                      handleFieldVisibility('interviewDates')
                      resetFormField('interviewDates')
                    }}
                    className="w-2 cursor-pointer"
                  />
                </div>
                {formData.interviewDates.map((date, index) => (
                  <div key={index} className="flex items-center space-x-2 mb-3">
                    <input
                      type="date"
                      value={date}
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
                <button
                  type="button"
                  onClick={addInterviewDate}
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-2 rounded transition duration-150 ease-in-out"
                >
                  Add Interview Date
                </button>
              </div>
            )}
            {!fieldVisibility.interviewDates && (
              <button
                type="button"
                onClick={() => handleFieldVisibility('interviewDates')}
                className="bg-green-600 rounded-md p-1 my-2 cursor-pointer hover:opacity-50 text-white"
              >
                Add Interview Dates
              </button>
            )}
            {fieldVisibility.notes && (
              <div className=" mt-2">
                <div className="flex justify-between">
                  <FormLabel htmlFor="notes" text="Notes" />
                  <img
                    src={x_solid}
                    alt="Close"
                    onClick={() => {
                      handleFieldVisibility('notes')
                      resetFormField('notes')
                    }}
                    className="w-2 cursor-pointer"
                  />
                </div>
                <textarea
                  id="notes"
                  name="notes"
                  rows="4"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                  placeholder="Add any additional notes here..."
                  value={formData.notes}
                  onChange={handleChange}
                  maxLength={1000}
                  style={{ resize: 'none' }} // Prevent resizing
                ></textarea>
              </div>
            )}
            {!fieldVisibility.notes && (
              <button
                type="button"
                onClick={() => handleFieldVisibility('notes')}
                className="bg-green-600 rounded-md p-1 my-2 cursor-pointer hover:opacity-50 text-white"
              >
                Add Notes
              </button>
            )}
          </div>
          <FormButton
            text="Create"
            type="submit"
            styles="bg-sky-600 text-white font-medium text-md py-1 mx-1 rounded-full shadow-md h-min flex w-full cursor-pointer hover:opacity-50 justify-center mt-2"
          />
        </form>
      )}
    </>
  )
}

export default CreateJobApplicationForm
