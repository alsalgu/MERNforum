import React, { Component } from 'react'
import Main from './components/Main.jsx'
import NavInst from './components/Nav.jsx'

class App extends Component {

  render() {
    return (
      <div>
        <NavInst/>
        <Main/>
      </div>
    )
  }
}

export default App
