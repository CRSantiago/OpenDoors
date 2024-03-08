import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav>
      <ul className="flex justify-between items-center mb-1 h-12">
        <li>
          <h2>OpenDoors</h2>
        </li>
        <div className="flex">
          <li className="mr-5 hover:underline">
            <Link to="/">Home</Link>
          </li>
          <li className="mr-5 hover:underline">
            <Link to="/contributions">Contributions</Link>
          </li>
          <li className="mr-5 hover:underline">
            <Link to="/auth">Login/Register</Link>
          </li>
        </div>
      </ul>
    </nav>
  )
}

export default Navbar
