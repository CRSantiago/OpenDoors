const updateUserData = async (userData) => {
  const user = JSON.parse(localStorage.getItem("authState")).user
  const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:3001"
  const response = await fetch(`${apiUrl}/api/users/update`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.token}`,
    },
    body: JSON.stringify(userData),
  })
  const data = await response.json()
  return data
}

export { updateUserData }
