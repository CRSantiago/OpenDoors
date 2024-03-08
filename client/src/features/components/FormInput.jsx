import React from 'react'

const FormInput = ({ type, id, name, value, onChange }) => {
  return (
    <input
      type={type}
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      className="mb-2"
    />
  )
}

export default FormInput
