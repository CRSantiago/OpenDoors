import React from 'react'

const FormButton = ({ type, text, styles, handleClick }) => {
  return (
    <button type={type} className={styles} onClick={handleClick}>
      {text}
    </button>
  )
}

export default FormButton
