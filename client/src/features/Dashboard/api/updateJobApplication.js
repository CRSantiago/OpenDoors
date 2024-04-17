const updateJobApplication = async (jobApplication) => {
  const user = JSON.parse(localStorage.getItem("authState")).user
  const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:3001"
  const response = await fetch(
    `${apiUrl}/api/job-applications/${jobApplication._id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify(jobApplication),
    }
  )
  const data = await response.json()
  return data
}

export { updateJobApplication }
