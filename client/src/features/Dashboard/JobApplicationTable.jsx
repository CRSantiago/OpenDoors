import React, { useState, useMemo } from "react"
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
  const [statusFilter, setStatusFilter] = useState("All")
  const [deleteIds, setDeleteIds] = useState([]) // List of application IDs to delete
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false) // Show the delete confirmation modal
  const [sortDirection, setSortDirection] = useState("descending")

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

  const handleStatusFilterChange = (e) => {
    setStatusFilter(e.target.value)
  }

  const toggleSortDirection = () => {
    setSortDirection((currentDirection) =>
      currentDirection === "ascending" ? "descending" : "ascending"
    )
  }

  const sortedApplications = useMemo(() => {
    return [...applications].sort((a, b) => {
      const dateA = new Date(a.dateApplied)
      const dateB = new Date(b.dateApplied)
      if (dateA < dateB) {
        return sortDirection === "ascending" ? -1 : 1
      }
      if (dateA > dateB) {
        return sortDirection === "ascending" ? 1 : -1
      }
      return 0
    })
  }, [applications, sortDirection])

  const filteredApplications = sortedApplications.filter((application) =>
    statusFilter === "All" ? true : application.status === statusFilter
  )

  const { currentData, currentPage, totalPages, handlePageChange } =
    usePagination(filteredApplications, itemsPerPage, statusFilter) // Pagination logic - custom hook

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
          <div className=" flex mb-3">
            <div className="flex flex-col mr-2">
              <label
                htmlFor="statusFilter"
                className="block text-sm font-medium text-gray-700"
              >
                Filter By Status
              </label>
              <select
                id="statusFilter"
                value={statusFilter}
                onChange={handleStatusFilterChange}
                className="form-select appearance-none block w-full px-3 py-2 border border-gray-300 bg-white text-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 hover:cursor-pointer"
              >
                <option value="All">All</option>
                <option value="Applied">Applied</option>
                <option value="Assessment">Assessment</option>
                <option value="Phone Screen">Phone Screen</option>
                <option value="Interviewing">Interviewing</option>
                <option value="Offer">Offer</option>
                <option value="Accepted">Accepted</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
            <div className="flex flex-col">
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
                className="form-select appearance-none block w-full px-3 py-2 border border-gray-300 bg-white text-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 hover:cursor-pointer"
              >
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="25">25</option>
                <option value="50">50</option>
              </select>
            </div>
          </div>
        </div>
        <table className="table-auto min-w-full border-spacing-2">
          <thead className="bg-indigo-800 text-indigo-50">
            <tr>
              <th className="text-sm font-medium py-3"></th>
              <th className="text-sm font-medium px-6 py-3">Company Name</th>
              <th className="text-sm font-medium px-6 py-3">Job Title</th>
              <th
                className="text-sm font-medium px-6 py-3 hover:cursor-pointer"
                onClick={toggleSortDirection}
              >
                Date Applied {sortDirection === "ascending" ? "↑" : "↓"}
              </th>
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
