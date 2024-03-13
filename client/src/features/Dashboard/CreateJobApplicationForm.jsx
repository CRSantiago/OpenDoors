import React, { useState } from 'react'
import { FormLabel, FormInput, FormButton } from '../components'
import x_solid from './assets/xmark_solid.svg'
import { createJobApplication } from './api'

const CreateJobApplicationForm = ({ setIsCreating, fetchUserData }) => {
  const statusEnum = [
    'Applied',
    'Phone Screen',
    'Onsite',
    'Offer',
    'Accepted',
    'Rejected',
  ]
  const [formData, setFormData] = useState({
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
  })
  const [fieldErrors, setFieldErrors] = useState({
    company: '',
    jobTitle: '',
    dateApplied: '',
    status: '',
    source: '',
    location: '',
    notes: '',
    contactEmail: '',
    contactPhone: '',
    interviewDates: [],
  })

  const [fieldVisibility, setFieldVisibility] = useState({
    source: false,
    location: false,
    notes: false,
    contactEmail: false,
    contactPhone: false,
    interviewDates: false,
  })

  const handleFieldVisibility = (fieldName) => {
    setFieldVisibility((prevState) => ({
      ...prevState,
      [fieldName]: !prevState[fieldName],
    }))
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    createJobApplication(formData)
      .then((data) => {
        setIsCreating(false)
        fetchUserData()
      })
      .catch((error) => {
        console.error('Error creating job application', error)
      })
  }

  return (
    <form
      className="w-1/3 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-white p-3"
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
                  setFormData({ ...formData, source: '' })
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
                  setFormData({ ...formData, location: '' })
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
      </div>
      <FormButton
        text="Create"
        type="submit"
        styles="bg-sky-600 text-white font-medium text-md py-1 mx-1 rounded-full shadow-md h-min flex w-full cursor-pointer hover:opacity-50 justify-center mt-2"
      />
    </form>
  )
}

export default CreateJobApplicationForm
