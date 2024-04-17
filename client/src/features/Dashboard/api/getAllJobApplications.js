const getAllJobApplications = async () => {
  const user = JSON.parse(localStorage.getItem("authState")).user
  const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:3001"
  const reponse = await fetch(`${apiUrl}/api/job-applications`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.token}`,
    },
  })
  const data = await reponse.json()
  return data
}

export { getAllJobApplications }
