import React, {Component} from 'react';
import {Link} from 'react-router-dom'

export default class editArt extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      title: "Loading..",
      body: "Loading...",
      author: "Loading..",
      data: [],
      message: ""
    }

    // Bind the Handlers to the Document
    // Submit Handler
    // Delete Handler
    // Update Handler
    this.handleUpdate = this.handleUpdate.bind(this)
    // Change Handler
    this.handleChange = this.handleChange.bind(this)
    // DataFetch
    this.fetchData = this.fetchData.bind(this)

  }

  // Data Fetch
  fetchData() {
    fetch('/api/Articles').then((response) => response.json()).then((data) => {
      this.setState({data: data});
      this.state.data.filter((data) => data._id === this.state.id).map((data, i) => {
        this.setState({title: data.title, body: data.body, author: data.author})
      })
    })
  }

  // Handle Change
  handleChange(e) {
    let name = e.target.name
    let value = e.target.value

    this.setState({[name]: value})
  }

  // Handle Update
  handleUpdate(e) {
    e.preventDefault();
    const url = '/Articles/' + this.state.id + '/edit'
    let reqBody = {
      title: this.state.title,
      body: this.state.body,
      author: this.state.author
    }
    console.log(reqBody)
    console.log(url)
    fetch(url, {
      body: JSON.stringify(reqBody),
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      method: "PUT"
    })
    this.setState({message: "Updated!"})
  }

  //Component Mount
  componentDidMount() {
    this.fetchData();
  }

  //handleUpdate{}

  render() {
    const article = (<div>
      <input type="text" name="title" value={this.state.title} onChange={(e) => this.handleChange(e)}/>
      <br/>
      <input type="text" name="body" value={this.state.body} onChange={(e) => this.handleChange(e)}/>
      <br/>
      <input type="text" name="author" value={this.state.author} onChange={(e) => this.handleChange(e)}/>
    </div>)
    const controls = (<div>
      <Link to={`/Articles/${this.state.id}/edit`} onClick={(e) => this.handleUpdate(e)}>
        <button>Update</button>
      </Link>
      <Link to={`/Articles/${this.state.id}/`}>
        <button>Cancel</button>
      </Link>
    </div>)

    return (<div>
      <div>{article}</div>
      <div>{controls}</div>
      <div>{this.state.message}</div>
    </div>)
  }
}
