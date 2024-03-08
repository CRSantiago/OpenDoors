import React from 'react'

const FormLabel = ({ htmlFor, text }) => {
  return <label htmlFor={htmlFor}>{text}</label>
}

export default FormLabel
