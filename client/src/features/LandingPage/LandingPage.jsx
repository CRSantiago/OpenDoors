import React from 'react'

const LandingPage = () => {
  return (
    <div>
      <div className="bg-gray-100">
        <div className="container mx-auto px-6 py-16 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-2">
            Manage Your Job Applications with Ease with OpenDoors
          </h1>
          <p className="text-gray-600 mb-6">
            The ultimate hub for tracking every aspect of your job search in one
            place.
          </p>
          <a
            href="/auth"
            className="bg-indigo-500 text-white font-bold py-2 px-4 rounded hover:bg-indigo-600"
          >
            Get Started Now
          </a>
        </div>
      </div>
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white shadow rounded p-6">
            <h3 className="font-semibold mb-2">Job Title & Company</h3>
            <p>
              Track where you're applying and the positions you're aiming for.
            </p>
          </div>

          <div className="bg-white shadow rounded p-6">
            <h3 className="font-semibold mb-2">Application Date & Status</h3>
            <p>
              Never lose track of your application timelines and current status.
            </p>
          </div>

          <div className="bg-white shadow rounded p-6">
            <h3 className="font-semibold mb-2">Contacts & Interview Dates</h3>
            <p>
              Keep all your important contacts and interview dates in one place.
            </p>
          </div>
        </div>
      </div>
      <div className="bg-gray-200 text-center py-16">
        <h2 className="text-2xl font-bold mb-2">
          Ready to take control of your job search?
        </h2>
        <p className="mb-4">
          Join us today and streamline your application process.
        </p>
        <a
          href="/auth"
          className="bg-indigo-500 text-white font-bold py-2 px-4 rounded hover:bg-indigo-600"
        >
          Sign Up Now
        </a>
      </div>
    </div>
  )
}

export default LandingPage
