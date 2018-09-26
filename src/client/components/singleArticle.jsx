import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import {Table} from 'react-bootstrap'

export default class singArt extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      title: "Loading..",
      body: "Loading...",
      author: "Loading..",
      data: []
    }

    // Bind the Handlers to the Document
    // Submit Handler
    // Delete Handler
    // Update Handler
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

  //Component Mount
  componentDidMount() {
    this.fetchData();
  }

  //handleUpdate{}

  render() {

    const controls = (<div>
      <Link to={`/Articles/${this.state.id}/edit`}>
        <button>Edit</button>
      </Link>
    </div>)

    const table = (<Table striped bordered condensed hover>
      <tbody>
        <tr>
          <th>
            <h1>{this.state.title}</h1>
          </th>
        </tr>
        <tr>
          <th>
            <h4>By{' '}{this.state.author}</h4>
          </th>
        </tr>
        <tr>
          <th>{this.state.body}</th>
        </tr>
      </tbody>
    </Table>)
    return (<div>
      <div>{table}</div>
      <div>{controls}</div>
    </div>)
  }
}
