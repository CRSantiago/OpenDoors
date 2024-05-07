import { isPasswordStrong } from "../../Auth/utils"

const validateFormData = (formData) => {
  const { currentPassword, newPassword, confirmNewPassword } = formData
  const errors = {}

  if (currentPassword === "") {
    errors.currentPassword = "Enter your current password."
  } else {
    errors.currentPassword = ""
  }

  if (!isPasswordStrong(newPassword)) {
    errors.newPassword =
      "Must have at least one uppercase letter. At least one lowercase letter. At least one digit. At least one special character. Minimum eight characters in length."
  } else {
    errors.newPassword = ""
  }

  if (newPassword !== confirmNewPassword) {
    errors.confirmNewPassword = "Passwords do not match."
  } else {
    errors.confirmNewPassword = ""
  }

  return errors
}

export default validateFormData
