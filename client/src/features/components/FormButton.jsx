import React from 'react'

const FormButton = ({ type, text, styles }) => {
  return (
    <button type={type} className={styles}>
      {text}
    </button>
  )
}

export default FormButton
