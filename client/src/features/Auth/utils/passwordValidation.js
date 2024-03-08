/**
 * 
This regex checks for:
At least one uppercase letter.
At least one lowercase letter.
At least one digit.
At least one special character.
Minimum eight characters in length.password 
 * @returns boolean
 */
export function isPasswordStrong(password) {
  const strongPasswordRegex = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$"
  )
  return strongPasswordRegex.test(password)
}
