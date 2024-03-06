import React from "react"
import { Link } from "react-router-dom"

const Navbar = () => {
  return (
    <nav>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        <li style={{ display: "inline", marginRight: "20px" }}>
          <Link to="/">Landing</Link>
        </li>
        <li style={{ display: "inline", marginRight: "20px" }}>
          <Link to="/contributions">Contributions</Link>
        </li>
        <li style={{ display: "inline" }}>
          <Link to="/auth">Login/Register</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
