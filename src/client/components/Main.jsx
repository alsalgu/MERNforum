import React, {Component} from 'react'
import {Switch, Route} from 'react-router-dom'
import Home from './Home.jsx'
import Login from './Login.jsx'
import Register from './Register.jsx'

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route path='/home' component={Home}/>
      <Route path='/login' component={Login}/>
      <Route path='/register' component={Register}/>
    </Switch>
  </main>
)

export default Main
