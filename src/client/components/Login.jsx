import React, {Component} from 'react'

export default class Login extends Component {
  render() {
    return (<form method="post" action="/login">
      username/email:<br/>
      <input type="text" name="email"/><br/>
      email:<br/>
      <input type="text" name="username"/><br/>
      Password:<br/>
      <input type="password" name="password"/><br/>
      <input type="submit" value="Submit"/>
    </form>)
  }
}
