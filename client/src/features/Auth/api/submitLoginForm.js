const submitLoginForm = async (formData) => {
  const response = await fetch('http://localhost:3001/api/users/signin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  })
  const data = await response.json()
  return data
}

export { submitLoginForm }
