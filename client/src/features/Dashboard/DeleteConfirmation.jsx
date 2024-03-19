import React, { useState } from 'react'
import { deleteJobApplication } from './api'
import SuccessAnimation from './SuccessAnimation'

const DeleteConfirmation = ({
  deleteIds,
  setDeleteIds,
  setShowDeleteConfirmation,
  fetchUserData,
}) => {
  const [isSubmitted, setIsSubmitted] = useState(false) // Show the success animation

  const handleDelete = async () => {
    // Delete the job applications
    try {
      for (const id of deleteIds) {
        const response = await deleteJobApplication(id)
        if (response.message === 'Job application deleted successfully') {
          continue
        } else {
          throw new Error('Job application deletion failed') // Throw an error if the deletion fails
        }
      }
      setIsSubmitted(true) // Show the success animation
      setTimeout(() => {
        setDeleteIds([]) // Clear the deleteIds list
        setShowDeleteConfirmation(false) // Close the confirmation modal
        fetchUserData() // Fetch the updated data
      }, 2000)
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <>
      {isSubmitted ? (
        <SuccessAnimation message="Deleted successfully" />
      ) : (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50  bg-white p-5 rounded-md shadow-md">
          <h1>
            Are you sure you want to delete the following {deleteIds.length}{' '}
            application(s)?
          </h1>
          <div className="flex space-x-3 justify-center mt-2">
            <button
              type="button"
              onClick={handleDelete}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-2 rounded transition duration-150 ease-in-out"
            >
              Yes
            </button>
            <button
              type="button"
              onClick={() => setShowDeleteConfirmation(false)}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded transition duration-150 ease-in-out"
            >
              No
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default DeleteConfirmation
