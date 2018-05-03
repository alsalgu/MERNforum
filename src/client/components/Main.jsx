import React, {Component} from 'react'
import {Switch, Route} from 'react-router-dom'
import Home from './Home.jsx'
import Articles from './Articles.jsx'
import singArt from './singleArticle.jsx'
import editArt from './editArticle.jsx'

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route path='/home' component={Home}/>
      <Route exact path='/Articles' component={Articles}/>
      <Route exact path='/Articles/:id' component={singArt}/>
      <Route path='/Articles/:id/edit' component={editArt}/>
    </Switch>
  </main>
)

export default Main
