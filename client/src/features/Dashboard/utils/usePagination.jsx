import React, { useState } from 'react'

const usePagination = (data, itemsPerPage) => {
  const [currentPage, setCurrentPage] = useState(1)

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
