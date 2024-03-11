import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../AuthContext'

const Navbar = () => {
  const { user, logout } = useAuth()
  return (
    <nav className="bg-gray-800 text-white">
      <ul className="flex justify-between items-center py-4 px-6">
        <li>
          <h2 className="text-xl font-bold text-indigo-500">OpenDoors</h2>
        </li>
        <div className="flex">
          <li className="mr-6">
            <Link to="/" className="hover:bg-gray-700 p-2 rounded">
              Home
            </Link>
          </li>
          <li className="mr-6">
            <Link to="/contributions" className="hover:bg-gray-700 p-2 rounded">
              Contributions
            </Link>
          </li>
          <li className="mr-6">
            <Link to="/auth" className="hover:bg-gray-700 p-2 rounded">
              Login/Register
            </Link>
          </li>
          <div className="flex items-center">
            {user && (
              <button
                onClick={logout}
                className="bg-indigo-500 hover:bg-indigo-600 px-2 py-1 rounded transition duration-300 ease-in-out"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </ul>
    </nav>
  )
}

export default Navbar
