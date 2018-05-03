import React, {Component} from 'react';
import {Link} from 'react-router-dom'

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
    const article = (<div>{this.state.title}<br/>{this.state.body}<br/>By{' '}{this.state.author}</div>)

    const controls = (<div>
      <Link to={`/Articles/${this.state.id}/edit`}>
        <button>Edit</button>
      </Link>
    </div>)

    return (<div>
      <div>{article}</div>
      <div>{controls}</div>
    </div>)
  }
}
