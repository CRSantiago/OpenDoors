import React from "react"
import ContributionCard from "./ContributionCard"
const Contributions = () => {
  return (
    <section className="flex items-center flex-col bg-gray-100">
      <div className="flex items-center flex-col">
        <h2 className="text-3xl md:text-5xl font-bold text-gray-800 my-3">
          Contribute to Our Project
        </h2>
        <p>
          We're always looking for ways to improve and would love your input and
          contributions. Here's how you can help:
        </p>
      </div>
      <div className="flex justify-">
        <ContributionCard
          title="Suggest Improvements"
          description="Got an idea to make our project better? We'd love to hear your suggestions."
          buttonText="Share Ideas"
          onClickHandler={() => {
            /* function to handle click event for improvements */
          }}
        />
        <ContributionCard
          title="How to Contribute"
          description="Interested in contributing directly to the project? Check out our Github."
          buttonText="Learn More"
          onClickHandler={() => {
            window.open(
              "https://github.com/CRSantiago/OpenDoors",
              "_blank",
              "noopener,noreferrer"
            )
          }}
        />
      </div>
    </section>
  )
}

export default Contributions
