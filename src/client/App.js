import React, { Component } from 'react'
import Main from './components/Main.jsx'
import Nav from './components/Nav.jsx'

class App extends Component {

  render() {
    return (
      <div>
        <Nav/>
        <Main/>
      </div>
    )
  }
}

export default App
