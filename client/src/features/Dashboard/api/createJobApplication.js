const createJobApplication = async (jobApplication) => {
  const user = JSON.parse(localStorage.getItem('authState')).user
  const response = await fetch('http://localhost:3001/api/job-applications', {
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
