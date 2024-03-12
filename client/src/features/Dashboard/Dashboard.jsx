import React, { useEffect, useState } from 'react'
import { getAllJobApplications } from './api'
import JobApplicationTable from './JobApplicationTable'
import { useAuth } from '../../AuthContext'

const Dashboard = () => {
  const [jobApplications, setJobApplications] = useState([])
  useEffect(() => {
    getAllJobApplications()
      .then((data) => setJobApplications(data))
      .catch((error) => console.error(error))
  }, [])
  const { user } = useAuth()
  return (
    <div>
      <h1 className="text-center font-semibold text-xl mb-5 mt-3">
        Welcome, {user.username}. Your next opportunity awaits!
      </h1>
      <JobApplicationTable applications={jobApplications} />
    </div>
  )
}

export default Dashboard
