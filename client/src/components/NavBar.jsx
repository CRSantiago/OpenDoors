import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../AuthContext'

const Navbar = () => {
  const { user, logout } = useAuth()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <nav className="bg-primary text-textPrimary">
      <div className="flex justify-between items-center px-4 py-2 sm:px-6">
        <h2 className="text-xl font-bold textPrimary">OpenDoors</h2>
        <div className="sm:hidden">
          {/* Button for toggling the menu on small screens */}
          <button
            onClick={toggleMobileMenu}
            className="text-textPrimary focus:outline-none focus:ring"
          >
            <i className="fas fa-bars"></i>{' '}
          </button>
        </div>
        <ul
          className={`hidden sm:flex sm:items-center sm:space-x-6 ${
            isMobileMenuOpen ? 'flex' : 'hidden'
          }`}
        >
          <li>
            <Link to="/" className="hover:bg-secondary p-2 rounded">
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/contributions"
              className="hover:bg-secondary p-2 rounded"
            >
              Contributions
            </Link>
          </li>
          {!user && (
            <li>
              <Link to="/auth" className="hover:bg-secondary p-2 rounded">
                Login/Register
              </Link>
            </li>
          )}
          {user && (
            <>
              <li>
                <Link
                  to="/dashboard"
                  className="hover:bg-secondary p-2 rounded"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/settings" className="hover:bg-secondary p-2 rounded">
                  Settings
                </Link>
              </li>
              <li>
                <button
                  onClick={logout}
                  className="bg-accent hover:bg-secondary px-2 py-1 rounded transition duration-300 ease-in-out"
                >
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
      {/* Mobile Menu */}
      <div
        className={`flex flex-col p-4 bg-primary text-textPrimary absolute w-full ${
          isMobileMenuOpen ? 'block' : 'hidden'
        }`}
      >
        <Link to="/" className="block py-2 hover:bg-secondary p-2 rounded">
          Home
        </Link>
        <Link
          to="/contributions"
          className="block py-2 hover:bg-secondary p-2 rounded"
        >
          Contributions
        </Link>
        {!user && (
          <Link
            to="/auth"
            className="block py-2 hover:bg-secondary p-2 rounded"
          >
            Login/Register
          </Link>
        )}
        {user && (
          <>
            <Link
              to="/dashboard"
              className="block py-2 hover:bg-secondary p-2 rounded"
            >
              Dashboard
            </Link>
            <Link
              to="/settings"
              className="block py-2 hover:bg-secondary p-2 rounded"
            >
              Settings
            </Link>
            <button
              onClick={logout}
              className="block py-2 bg-accent hover:bg-secondary px-2 rounded transition duration-300 ease-in-out"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar
