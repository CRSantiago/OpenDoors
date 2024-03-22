import React, { useState } from "react"
import JobApplicationViewRow from "./JobApplicationViewRow"
import JobApplicationEditRow from "./JobApplicationEditRow"
import plus_solid from "./assets/plus_solid_black.svg"
import trashcan from "./assets/trashcan.svg"
import CreateJobApplicationForm from "./CreateJobApplicationForm"
import DeleteConfirmation from "./DeleteConfirmation"
import usePagination from "./utils/usePagination"

const JobApplicationTable = ({ applications, fetchUserData }) => {
  const [isCreating, setIsCreating] = useState(false) // Show the create form
  const [editingId, setEditingId] = useState(false) // Show the edit form

  const [deleteIds, setDeleteIds] = useState([]) // List of application IDs to delete
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false) // Show the delete confirmation modal

  const [itemsPerPage, setItemsPerPage] = useState(10)

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

  const toggleEditMode = (id) => {
    if (id === editingId) {
      setEditingId(null) // cancel edit mode if the same application is clicked
    } else {
      setEditingId(id)
    }
  }

  const { currentData, currentPage, totalPages, handlePageChange } =
    usePagination(applications, itemsPerPage) // Pagination logic - custom hook

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
            ? "filter blur-sm flex justify-center w-full flex-col"
            : "flex justify-center w-full flex-col"
        }
      >
        <div className="flex justify-between items-center">
          <div>
            <div className="flex items-center">
              {/* Show form to create a job application */}
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
              {/* Show the delete button only when there are applications selected */}
              <div
                className={`${
                  deleteIds.length <= 0 && "hidden"
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
          </div>
          <div className="mb-3">
            <label
              htmlFor="itemsPerPage"
              className="block text-sm font-medium text-gray-700"
            >
              Items Per Page
            </label>
            <select
              id="itemsPerPage"
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
              className="form-select appearance-none block w-full px-3 py-2 border border-gray-300 bg-white text-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="25">25</option>
              <option value="50">50</option>
            </select>
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
              <td className="text-sm font-medium px-6 py-3"></td>
            </tr>
          </thead>
          <tbody>
            {currentData.map((application) =>
              // If the application is being edited, show the edit form
              editingId === application._id ? (
                <JobApplicationEditRow
                  key={application._id}
                  application={application}
                  deleteIds={deleteIds}
                  handleApplicationSelection={handleApplicationSelection}
                  toggleEditMode={toggleEditMode}
                  fetchUserData={fetchUserData}
                />
              ) : (
                // Otherwise, show the view form
                <JobApplicationViewRow
                  key={application._id}
                  application={application}
                  deleteIds={deleteIds}
                  handleApplicationSelection={handleApplicationSelection}
                  toggleEditMode={toggleEditMode}
                />
              )
            )}
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
