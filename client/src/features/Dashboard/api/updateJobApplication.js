const updateJobApplication = async (jobApplication) => {
  const user = JSON.parse(localStorage.getItem('authState')).user
  const response = await fetch(
    `http://localhost:3001/api/job-applications/${jobApplication._id}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify(jobApplication),
    }
  )
  const data = await response.json()
  return data
}

export { updateJobApplication }
