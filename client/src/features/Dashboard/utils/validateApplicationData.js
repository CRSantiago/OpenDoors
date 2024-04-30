const validateFormData = (formData) => {
  let errors = {}

  if (formData.company === '') {
    errors.company = 'Company name is required'
  } else {
    errors.company = ''
  }

  if (formData.jobTitle === '') {
    errors.jobTitle = 'Job title is required'
  } else {
    errors.jobTitle = ''
  }

  if (formData.dateApplied === '') {
    errors.dateApplied = 'Date applied is required'
  } else {
    errors.dateApplied = ''
  }

  if (formData.status === '') {
    errors.status = 'Status is required'
  } else {
    errors.status = ''
  }

  return errors
}

export default validateFormData
