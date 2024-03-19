import React, { useState, useEffect } from 'react'
import JobApplicationRow from './JobApplicationRow'
import plus_solid from './assets/plus_solid_black.svg'
import trashcan from './assets/trashcan.svg'
import CreateJobApplicationForm from './CreateJobApplicationForm'
import DeleteConfirmation from './DeleteConfirmation'
import usePagination from './utils/usePagination'

const JobApplicationTable = ({ applications, fetchUserData }) => {
  const [isCreating, setIsCreating] = useState(false)
  const [deleteIds, setDeleteIds] = useState([]) // List of application IDs to delete
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false) // Show the delete confirmation modal
  // const [currentPage, setCurrentPage] = useState(1)
  // const [currentData, setCurrentData] = useState([])

  const handleApplicationSelection = (applicationId) => {
    setDeleteIds((prevIds) => {
      if (prevIds.includes(applicationId)) {
        // If already selected, remove from the list
        return prevIds.filter((id) => id !== applicationId)
      } else {
        // Otherwise, add to the list
        return [...prevIds, applicationId]
      }
    })
  }

  const itemsPerPage = 10
  const { currentData, currentPage, totalPages, handlePageChange } =
    usePagination(applications, itemsPerPage)

  return (
    <div className="flex flex-col items-center bg-sky-50 p-3 shadow-lg mx-36 mb-10 rounded-lg overflow-x-auto">
      {isCreating && (
        <CreateJobApplicationForm
          setIsCreating={setIsCreating}
          fetchUserData={fetchUserData}
        />
      )}
      {showDeleteConfirmation && (
        <DeleteConfirmation
          deleteIds={deleteIds}
          setDeleteIds={setDeleteIds}
          setShowDeleteConfirmation={setShowDeleteConfirmation}
          fetchUserData={fetchUserData}
        />
      )}
      <h1 className="text-xl mb-5">Job Application Table</h1>
      <div
        className={
          showDeleteConfirmation
            ? 'filter blur-sm flex justify-center w-full flex-col'
            : 'flex justify-center w-full flex-col'
        }
      >
        <div className="flex mb-2 items-center">
          <div
            className="bg-sky-600 text-white font-medium py-2 px-4 mx-1 rounded-full shadow-md h-min flex w-fit text-sm cursor-pointer hover:opacity-50"
            onClick={() => setIsCreating((prevState) => !prevState)}
          >
            Create
            <img
              className="w-3 ml-2"
              src={plus_solid}
              alt="Add Job Application"
            />
          </div>
          <div
            className={`${
              deleteIds.length <= 0 && 'hidden'
            } flex hover:cursor-pointer hover:opacity-60`}
          >
            <button
              className="ml-2 bg-black flex h-min w-fit font-medium py-2 px-4 mx-1 rounded-full shadow-md text-sm cursor-pointer hover:opacity-50"
              onClick={() => setShowDeleteConfirmation(true)}
            >
              <div className="text-red-500">Delete</div>
              <img className="w-3 ml-2" src={trashcan} alt="Delete User" />
            </button>
          </div>
        </div>
        <table className="table-auto min-w-full border-spacing-2">
          <thead className="bg-indigo-800 text-indigo-50">
            <tr>
              <th className="text-sm font-medium py-3"></th>
              <th className="text-sm font-medium px-6 py-3">Company Name</th>
              <th className="text-sm font-medium px-6 py-3">Job Title</th>
              <th className="text-sm font-medium px-6 py-3">Date Applied</th>
              <th className="text-sm font-medium px-6 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((application) => (
              <JobApplicationRow
                key={application._id}
                application={application}
                deleteIds={deleteIds}
                handleApplicationSelection={handleApplicationSelection}
              />
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination controls */}
      <div className="flex items-center justify-center mt-4">
        <button
          className="px-3 py-1 bg-indigo-500 text-white rounded"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="mx-4">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="px-3 py-1 bg-indigo-500 text-white rounded"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default JobApplicationTable
