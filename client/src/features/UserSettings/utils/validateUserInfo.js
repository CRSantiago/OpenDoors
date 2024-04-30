import { isValidEmail, isValidUsername } from '../../Auth/utils'

const validateFormData = (formData) => {
  let errors = {}

  if (!isValidUsername(formData.username)) {
    errors.username =
      'Enter a valid username. It must be 3-20 characters long and contain only letters, numbers, underscores, or dashes.'
  } else {
    errors.username = ''
  }

  if (!isValidEmail(formData.email)) {
    errors.email = 'Email is required'
  } else {
    errors.email = ''
  }

  return errors
}

export default validateFormData
