const getAllJobApplications = async () => {
  const user = JSON.parse(localStorage.getItem('authState')).user
  const reponse = await fetch('http://localhost:3001/api/job-applications', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${user.token}`,
    },
  })
  const data = await reponse.json()
  return data
}

export { getAllJobApplications }
