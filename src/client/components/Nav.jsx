import React from 'react'
import { Link } from 'react-router-dom'

const Nav = () => (
  <ul>
    <li><Link to='/'>Home</Link></li>
    <li><Link to='/login'>Login</Link></li>
    <li><Link to='/Register'>Register</Link></li>
  </ul>
)

export default Nav
