import { useState, useCallback } from "react"

/**
 * Custom hook to handle form state and validation
 * Recieves initial form data and a validation function
 */
const useForm = (initialFormData, validate) => {
  const [formData, setFormData] = useState(initialFormData)
  const [fieldErrors, setFieldErrors] = useState({})

  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target
      setFormData({
        ...formData,
        [name]: value,
      })
    },
    [formData]
  )
  const addInterviewDate = useCallback(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      interviewDates: [
        ...prevFormData.interviewDates,
        new Date().toISOString().slice(0, 10), // Add current date as default
      ],
    }))
  }, [])

  const removeInterviewDate = useCallback((indexToRemove) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      interviewDates: prevFormData.interviewDates.filter(
        (_, index) => index !== indexToRemove
      ),
    }))
  }, [])

  const handleDateChange = useCallback((event, index) => {
    setFormData((prevFormData) => {
      const newDates = [...prevFormData.interviewDates]
      newDates[index] = event.target.value
      return {
        ...prevFormData,
        interviewDates: newDates,
      }
    })
  }, [])

  const resetFormData = useCallback((newData) => {
    setFormData(newData)
  }, [])

  const resetFormField = useCallback(
    (field) => {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [field]: initialFormData[field],
      }))
    },
    [initialFormData]
  )

  // Function to handle form validation based on the validate function passed to the hook
  const handleValidation = useCallback(() => {
    const newErrors = validate(formData)
    setFieldErrors((prevErrors) => ({
      ...prevErrors,
      ...newErrors,
    }))

    return Object.keys(newErrors).every((key) => newErrors[key] === "") // Return true if all errors are empty
  }, [formData, validate])

  return {
    formData,
    handleChange,
    addInterviewDate,
    removeInterviewDate,
    handleDateChange,
    resetFormData,
    resetFormField,
    fieldErrors,
    handleValidation,
  }
}

export default useForm
