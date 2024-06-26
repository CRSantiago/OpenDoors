import { useState, useEffect } from 'react'

const usePagination = (data, itemsPerPage, statusFilter) => {
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    // Reset to first page if itemsPerPage changes
    setCurrentPage(1)
  }, [itemsPerPage, statusFilter])

  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentData = data.slice(startIndex, endIndex)

  const totalPages = Math.ceil(data.length / itemsPerPage)

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage)
    }
  }

  return { currentData, currentPage, totalPages, handlePageChange }
}

export default usePagination
