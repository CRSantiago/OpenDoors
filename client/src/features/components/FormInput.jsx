import React from "react"

const FormInput = ({ type, id, name, value, onChange, error }) => {
  return (
    <div className="mb-4 w-full">
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className={`shadow appearance-none border${
          error ? "border-red-500" : "border-gray-500"
        } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
      />
      <p
        className={`text-error font-bold text-xs italic mt-1 ${
          error ? "visible" : "invisible"
        }`}
      >
        {error || ""}
      </p>
    </div>
  )
}

export default FormInput
