import React from "react"

const FormInput = ({ type, id, name, value, onChange, error }) => {
  return (
    <div className="mb-4">
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className={`shadow appearance-none border ${
          error ? "border-red-500" : "border-gray-300"
        } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
      />
      {error && <p className="text-red-500 text-xs italic">{error}</p>}{" "}
      {/* Display error message */}
    </div>
  )
}

export default FormInput
