import React from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      user: null,
      username: '',
      password: ''
    }
  }

  componentDidMount() {
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )
  }

  login = async event => {
    event.preventDefault()
    console.log('login', this.state.username, this.state.password)
    try{
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })

      this.setState({ username: '', password: '', user })
    } catch(exception) {
      console.log(exception)
    }
  }

  handleLoginFieldChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  render() {

    const loginForm = () => (
      <div>
        <h2>Log in to application</h2>

        <form onSubmit={this.login}>
          <div>
            username
            <input
              type="text"
              name="username"
              value={this.state.username}
              onChange={this.handleLoginFieldChange}
              />
          </div>
          <div>
            password
            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleLoginFieldChange}
              />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )

    const blogList = () => (
      <div>
        <h2>blogs</h2>
        <p>{this.state.user.name} logged in</p>
        {this.state.blogs.map(blog =>
          <Blog key={blog.id} blog={blog}/>
        )}
      </div>
    )

    return (
      <div>
        {this.state.user ?
          blogList() :
          loginForm()
        }
      </div>
    )
  }
}

export default App
