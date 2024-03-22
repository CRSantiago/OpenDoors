import React from "react"
import successIcon from "./assets/success.png"
import analyzeIcon from "./assets/analyze.png"
import trackIcon from "./assets/track.png"
import registerIcon from "./assets/register.png"

const LandingPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        <div className="bg-gray-100">
          <div className="container mx-auto px-6 py-16 text-center">
            <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-2">
              Manage Your Job Applications with Ease with OpenDoors
            </h1>
            <p className="text-gray-600 mb-6">
              The ultimate hub for tracking every aspect of your job search in
              one place.
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
                Never lose track of your application timelines and current
                status.
              </p>
            </div>

            <div className="bg-white shadow rounded p-6">
              <h3 className="font-semibold mb-2">Contacts & Interview Dates</h3>
              <p>
                Keep all your important contacts and interview dates in one
                place.
              </p>
            </div>
          </div>
        </div>
        <div className="py-12 bg-gray-100">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">
              How It Works
            </h2>
            <div className="mt-10">
              <div className="flex flex-col md:flex-row justify-center items-center">
                {/* Step 1: Register */}
                <div className="m-4">
                  <div className="flex flex-col items-center">
                    <img
                      src={registerIcon}
                      alt="Register"
                      className="h-12 w-12"
                    />
                    <h3 className="text-lg font-medium text-gray-900 mt-4">
                      Register
                    </h3>
                    <p className="mt-2 text-base text-gray-500 text-center">
                      Sign up and start adding your job applications in minutes.
                      It’s free and easy.
                    </p>
                  </div>
                </div>

                {/* Step 2: Track */}
                <div className="m-4">
                  <div className="flex flex-col items-center">
                    <img src={trackIcon} alt="Track" className="h-12 w-12" />
                    <h3 className="text-lg font-medium text-gray-900 mt-4">
                      Track
                    </h3>
                    <p className="mt-2 text-base text-gray-500 text-center">
                      Keep tabs on every aspect of your applications, from
                      submission to offer. Stay organized effortlessly.
                    </p>
                  </div>
                </div>

                {/* Step 3: Analyze */}
                <div className="m-4">
                  <div className="flex flex-col items-center">
                    <img
                      src={analyzeIcon}
                      alt="Analyze"
                      className="h-12 w-12"
                    />
                    <h3 className="text-lg font-medium text-gray-900 mt-4">
                      Analyze
                    </h3>
                    <p className="mt-2 text-base text-gray-500 text-center">
                      Gain insights into your job search process. Identify
                      trends and improve your application strategies.
                    </p>
                  </div>
                </div>

                {/* Step 4: Succeed */}
                <div className="m-4">
                  <div className="flex flex-col items-center">
                    <img
                      src={successIcon}
                      alt="Succeed"
                      className="h-12 w-12"
                    />
                    <h3 className="text-lg font-medium text-gray-900 mt-4">
                      Succeed
                    </h3>
                    <p className="mt-2 text-base text-gray-500 text-center">
                      Leverage OpenDoors to enhance your job search success.
                      Land your dream job with less stress.
                    </p>
                  </div>
                </div>
              </div>
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
      <footer className="bg-gray-200 text-center py-4">
        <p>© 2023 OpenDoors. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default LandingPage
