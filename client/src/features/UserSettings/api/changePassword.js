const changePassword = async (formData) => {
  const user = JSON.parse(localStorage.getItem('authState')).user
  const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:3001'
  const response = await fetch(`${apiUrl}/api/users/change-password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${user.token}`,
    },
    body: JSON.stringify(formData),
  })
  const data = await response.json()
  return data
}

export { changePassword }
