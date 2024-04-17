const submitLoginForm = async (formData) => {
  const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:3001'

  const response = await fetch(`${apiUrl}/api/users/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
  const data = await response.json()
  return data
}

export { submitLoginForm }
