import React, {Component} from 'react';
import {Link} from 'react-router-dom'

export default class Articles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    }

    // Bind the Handlers to the Document
    // Submit Handler
    // Post Handler
    this.handlePost = this.handlePost.bind(this)
    // Delete Handler
    this.handleDelete = this.handleDelete.bind(this)
    // Update Handler
    // DataFetch
    this.fetchData = this.fetchData.bind(this)

  }

  // Data Fetch
  fetchData() {
    fetch('/api/Articles').then((response) => response.json()).then((data) => {
      this.setState({data});
    });
  }

  //Component Mount
  componentDidMount() {
    this.fetchData();
  }

  //handleDelete{}
  handleDelete(e, id) {
    e.preventDefault();
    // Pass id param to generate URL token for request
    let url = "/Articles/" + id
    fetch(url, {'method': 'DELETE'}).then(res => {
      if (res.ok) {
        console.log('baleeted')
        this.fetchData();
      }
    })
  }

  //handle Post
  handlePost(e) {
    // Prevent the default HTML function
    e.preventDefault();
    // Fetch Request with Post method and value params
    // Populate Form Values into JSON objet
    let reqBody = {
      title: this.refs.postTitle.value,
      body: this.refs.postContent.value,
      author: this.refs.postAuthor.value
    }
    // Fetch Request
    fetch("/Articles", {
      body: JSON.stringify(reqBody),
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      method: "POST"
    }).then(response => {
      if (response.ok) {
        console.log("Success")
        this.fetchData();
      }
    })
  }

  //handleUpdate{}

  render() {
    // New Article Form
    const postNew = (<div >
      <form>
        <input ref="postTitle" type="text" placeholder="Title"/><br/>
        <input ref="postAuthor" type="text" placeholder="Author"/><br/>
        <textarea ref="postContent">Article Content</textarea><br/>
        <button onClick={(e) => this.handlePost(e)}>Submit</button>
      </form>
    </div>)

    // Article Map Array into List
    const articleList = this.state.data.map((data, i) => {
      return (<div key={i}>
        <Link to={`/Articles/${data._id}`}>
          <li>{data.title}{' '}
            by{' '}{data.author}
            {' '}</li>
        </Link>
        <a href={"/Articles/" + data._id} onClick={(e) => this.handleDelete(e, data._id)}>
          <button>Delete</button>
        </a>
        <Link to={`/Articles/${data._id}/edit`}>
          <button>Edit</button>
        </Link>

      </div>)
    })

    return (<div>
      <div>
        <ul>{articleList}</ul>
      </div>
      <div>{postNew}</div>
    </div>)
  }
}
