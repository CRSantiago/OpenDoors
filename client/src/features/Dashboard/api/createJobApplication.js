const createJobApplication = async (jobApplication) => {
  const user = JSON.parse(localStorage.getItem('authState')).user
  const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:3001"
  const response = await fetch(`${apiUrl}/api/job-applications`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${user.token}`,
    },
    body: JSON.stringify(jobApplication),
  })
  const data = await response.json()
  return data
}

export { createJobApplication }
