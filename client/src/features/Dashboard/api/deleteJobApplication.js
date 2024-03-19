const deleteJobApplication = async (jobApplicationId) => {
  const user = JSON.parse(localStorage.getItem('authState')).user
  const response = await fetch(
    `http://localhost:3001/api/job-applications/${jobApplicationId}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
    }
  )
  const data = await response.json()
  return data
}

export { deleteJobApplication }
