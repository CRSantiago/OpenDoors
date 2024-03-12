import React from 'react'
import JobApplicationRow from './JobApplicationRow'
import plus_solid from './assets/plus_solid_black.svg'

const JobApplicationTable = ({ applications }) => {
  return (
    <div className="flex flex-col items-center bg-sky-50 p-3 shadow-lg mx-36 rounded-lg overflow-x-auto">
      <h1 className="text-xl mb-5">Job Application Table</h1>
      <div className="flex justify-center w-full flex-col">
        <div className="flex mb-2 items-center">
          <div
            className="bg-sky-600 text-white font-medium py-2 px-4 mx-1 rounded-full shadow-md h-min flex w-fit text-sm cursor-pointer hover:opacity-50"
            onClick={() => console.log('add application clicked!')}
          >
            Create
            <img
              className="w-3 ml-2"
              src={plus_solid}
              alt="Add Job Application"
            />
          </div>
        </div>
        <table className="table-auto min-w-full border-spacing-2">
          <thead className="bg-indigo-800 text-indigo-50">
            <tr>
              <th className="text-sm font-medium px-6 py-3">Company Name</th>
              <th className="text-sm font-medium px-6 py-3">Job Title</th>
              <th className="text-sm font-medium px-6 py-3">Date Applied</th>
              <th className="text-sm font-medium px-6 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((application) => (
              <JobApplicationRow
                key={application._id}
                application={application}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default JobApplicationTable
