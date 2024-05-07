import { isValidEmail } from "./emailValidation"
import { isPasswordStrong } from "./passwordValidation"
import { isValidUsername } from "./usernameValidation"

export function validateFormData(formData) {
  const errors = {}
  const { username, email, password, confirmPassword } = formData

  if (!isValidUsername(username)) {
    errors.username =
      "Enter a valid username. It must be 3-20 characters long and contain only letters, numbers, underscores, or dashes."
  } else {
    errors.username = ""
  }

  if (!isValidEmail(email)) {
    errors.email = "Invalid email"
  } else {
    errors.email = ""
  }

  if (!isPasswordStrong(password)) {
    errors.password =
      "Must have at least one uppercase letter. At least one lowercase letter. At least one digit. At least one special character. Minimum eight characters in length."
  } else {
    errors.password = ""
  }

  if (password !== confirmPassword) {
    errors.confirmPassword = "Passwords do not match"
  } else {
    errors.confirmPassword = ""
  }

  return errors
}
