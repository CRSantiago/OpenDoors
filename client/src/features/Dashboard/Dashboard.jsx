import React, { useEffect } from 'react'
import { getAllJobApplications } from './api'

const Dashboard = () => {
  useEffect(() => {
    getAllJobApplications()
      .then((data) => console.log(data))
      .catch((error) => console.error(error))
  }, [])
  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  )
}

export default Dashboard
