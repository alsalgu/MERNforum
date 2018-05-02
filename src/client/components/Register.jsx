import React, {Component} from 'react'

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      catID: "2020",
      catRename: "JHJH"
    };

    this.handleClick = this.handleClick.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.handlePost = this.handlePost.bind(this);
    this.handlePut = this.handlePut.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleClick(e, id) {
    e.preventDefault();
    let url = '/' + id
    console.log(url)
    fetch(url, {
      method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
    }).then(response => {
      if (response.status === 200) {
        this.fetchData();
      }
    })
  }

  handlePost(e) {
    e.preventDefault();
    let reqBody = {
      name: this.refs.catName.value,
      sex: this.refs.catSex.value,
      color: this.refs.catColor.value
    };

    fetch("/Register", {
      body: JSON.stringify(reqBody),
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      method: "POST"
    }).then(response => {
      if (response.ok) {
        this.fetchData();
      }
    })
  }

  handleChange(e) {
    this.setState({catRename: e.target.value})
  }

  handlePut(e, id, i) {
    e.preventDefault();
    const url = '/' + id
    let newname = this.state.catRename
    let reqBody = '{"name": "' + newname + '", "sex": "grill", "color": "white"}';
    console.log(reqBody)
    fetch(url, {
      body: reqBody,
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      method: "PUT"
    })
    this.fetchData();
  }

  fetchData() {
    fetch('/api/cat').then((response) => response.json()).then((data) => {
      this.setState({data});
    });
  }

  componentDidMount() {
    this.fetchData();
  }

  render() {
    content = this.state.data.map((data, i) => {
      return (<div key={i}>
        <p>{data.name}</p>
        <a href={data._id} onClick={(e) => this.handleClick(e, data._id)}>
          <button>Delete</button>
        </a>
        <a href={data._id} id={i} onClick={(e) => this.handlePut(e, data._id, i)}>
          <button>Rename</button>
        </a>
      </div>);
    })
    return (<div>
      <div id="register">
        <form onSubmit={(e) => this.handlePost(e)}>
          <input ref="catName" placeholder="Keanu" type="text" name="nameForm"/><br/>
          <input ref="catSex" placeholder="Male" type="text" name="sexForm"/><br/>
          <input ref="catColor" placeholder="Grey Tabby" type="text" name="colorForm"/><br/>
          <button type="Submit">Add Cat</button>
        </form>
        <form>
          <input onChange={this.handleChange} placeholder="Choose a New Name" name="renameCat" type="text"/>
        </form>
      </div>
      <div>
        <h1>Cat List:</h1>{content}</div>
    </div>)
  }
}
