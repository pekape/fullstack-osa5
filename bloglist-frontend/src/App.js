import React from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      user: null,
      username: '',
      password: '',
      error: null,
      success: null,
      timeout: null
    }
  }

  componentDidMount() {
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )

    const loggedInUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON)
      this.setState({ user })
      blogService.setToken(user.token)
    }
  }

  login = async event => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })

      window.localStorage.setItem('loggedInUser', JSON.stringify(user))
      blogService.setToken(user.token)

      this.setState({ username: '', password: '', user })
      this.notify('success', 'logged in')
    } catch(exception) {
      console.log(exception)
      this.notify('error', 'failed to login')
    }
  }

  notify = (success, message) => {
    clearTimeout(this.state.timeout)
    this.setState({
      success: null,
      error: null,
      [success]: message,
      timeout: setTimeout(() => this.setState({ [success]: null }), 3000)
    })
  }

  handleLoginFieldChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  logout = event => {
    this.notify('success', 'logged out')
    event.preventDefault()
    this.setState({ user: null })
    window.localStorage.removeItem('loggedInUser')
    blogService.setToken('')
  }

  addBlog = newBlog => {
    this.setState({ blogs: this.state.blogs.concat(newBlog) })
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
        <p>
          {this.state.user.name} logged in
          <button onClick={this.logout}>logout</button>
        </p>

        <Togglable buttonLabel="add blog">
          <BlogForm addBlog={this.addBlog} notify={this.notify} />
        </Togglable>
        <br />

        {this.state.blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    )

    return (
      <div>
        { this.state.error
          ? <Notification type="error" message={this.state.error} />
          : <Notification type="success" message={this.state.success} />
        }

        { this.state.user
          ? blogList()
          : loginForm()
        }
      </div>
    )
  }
}

export default App
