export function isValidUsername(username) {
  // a valid username must be 3-20 characters long and contain only letters, numbers, underscores, or dashes
  const usernameRegex = /^[a-zA-Z0-9_-]{3,20}$/
  return usernameRegex.test(String(username))
}
