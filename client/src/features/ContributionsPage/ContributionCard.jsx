import React from "react"

const ContributionCard = ({
  title,
  description,
  buttonText,
  onClickHandler,
}) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white mr-5 my-10">
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
        <p className="text-gray-700 text-base">{description}</p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <button
          className="bg-brightHighlight text-white font-bold py-2 px-4 rounded hover:bg-complementary"
          onClick={onClickHandler}
        >
          {buttonText}
        </button>
      </div>
    </div>
  )
}
export default ContributionCard
