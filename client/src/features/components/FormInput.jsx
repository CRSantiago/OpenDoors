import React from "react"

const getInputConstraints = (type) => {
  switch (type) {
    case "text":
      return { maxLength: 100 } // General text input
    case "email":
      return { maxLength: 254 } // Maximum length for email as per standards
      case 'password':
        return { maxLength: 64, minLength: 8 }; 
    case "tel":
      return { maxLength: 15 } // Phone numbers might include country code
    default:
      return {}
  }
}

const FormInput = ({ type, id, name, value, onChange, error }) => {
  const { maxLength, minLength} = getInputConstraints(type)
  return (
    <div className="mb-4 w-full">
      <input
        type={type}
        id={id}
        name={name}
        maxLength={maxLength}
        minLength={minLength}
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
