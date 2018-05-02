import React, {Component} from 'react'

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      catName: '',
      catSex: '',
      catColor: ''
    };

    this.handleClick = this.handleClick.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.handlePost = this.handlePost.bind(this);
  }

  handleClick(e, id) {
    e.preventDefault();
    const url = 'http://localhost:8000/' + id
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
    })

    this.fetchData();
  }

  fetchData() {
    fetch('http://localhost:8000/api/cat').then((response) => response.json()).then((data) => {
      this.setState({data});
    });
  }

  componentDidMount() {
    this.fetchData();
  }

  render() {
    content = this.state.data.map(data => {
      return (<div><form>
        <input ref="rename" value={data.name}/>
      </form>
        <a href={data._id} onClick={(e) => this.handleClick(e, data._id)}>
          <button>Delete</button>
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
      </div>
      <div><h1>Cat List:</h1>{content}</div>
    </div>)
  }
}
