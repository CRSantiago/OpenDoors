import React, { useState } from 'react'

const JobApplicationRow = ({ application }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const toggleExpand = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <>
      <tr
        onClick={toggleExpand}
        className="cursor-pointer hover:bg-indigo-500 hover:text-indigo-50 even:bg-sky-100"
      >
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
          <td colSpan="4" className="bg-gray-50 p-2 shadow-md">
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
