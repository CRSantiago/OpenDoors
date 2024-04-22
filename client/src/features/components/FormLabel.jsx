import React from "react"

const FormLabel = ({ htmlFor, text, styles }) => {
  return (
    <label htmlFor={htmlFor} className={styles}>
      {text}
    </label>
  )
}

export default FormLabel
