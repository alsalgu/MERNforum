import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import {Nav} from 'react-bootstrap'
import {Navbar} from 'react-bootstrap'
import {NavItem} from 'react-bootstrap'
import styles from '../css/stylesheet.css'

export default class NavInst extends Component {
  render(){
    return(<Navbar>
  <Nav>
    <NavItem componentClass='span'>
      <Link to='/'>Home</Link>
    </NavItem>
    <NavItem componentClass='span'>
      <Link to='/Articles'>Articles</Link>
    </NavItem>
  </Nav>
</Navbar>)
  }
}
