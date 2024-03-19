import React, { useState } from 'react'
import checkbox_checked from './assets/checkbox_checked.svg'
import checkbox_unchecked from './assets/checkbox_unchecked.svg'

const JobApplicationRow = ({
  application,
  deleteIds,
  handleApplicationSelection,
}) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const toggleExpand = () => {
    setIsExpanded(!isExpanded)
  }
  const isSelected = deleteIds.includes(application._id)
  return (
    <>
      <tr
        onClick={toggleExpand}
        className="cursor-pointer hover:bg-indigo-500 hover:text-indigo-50 even:bg-sky-100"
      >
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
        <td className="text-center px-6 py-3">{application.company}</td>
        <td className="text-center px-6 py-3">{application.jobTitle}</td>
        <td className="text-center px-6 py-3">
          {application.dateApplied.substring(0, 10)}
        </td>
        {/* Display only the date */}
        <td className="text-center px-6 py-3">{application.status}</td>
      </tr>
      {isExpanded && (
        <tr>
          <td colSpan="5" className="bg-gray-50 p-2 shadow-md">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <p>Source: {application.source}</p>
              <p>Location: {application.location}</p>
              <p>Contact Email: {application.contactEmail}</p>
              <p>Contact Phone: {application.contactPhone}</p>
              <p>
                Interview Dates:{' '}
                {application.interviewDates
                  .map((date) => date.substring(0, 10))
                  .join(', ')}
              </p>
              <p>Notes: {application.notes}</p>
            </div>
          </td>
        </tr>
      )}
    </>
  )
}

export default JobApplicationRow
