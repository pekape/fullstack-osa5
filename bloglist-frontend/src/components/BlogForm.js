import React from 'react'
import blogService from '../services/blogs'

class BlogForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      author: '',
      url: ''
    }
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  submitForm = async event => {
    event.preventDefault()

    const newBlog = {
      title: this.state.title,
      author: this.state.author,
      url: this.state.url,
    }

    try {
      await blogService.create(newBlog)
      this.setState({
        title: '',
        author: '',
        url: ''
      })
    } catch(exception) {
      console.log(exception)
    }
  }

  render() {
    return (
      <div>
        <h3>create new</h3>
        <form onSubmit={this.submitForm}>

          title
          <input
            type="text"
            name="title"
            value={this.state.title}
            onChange={this.handleChange}
          />
          <br />

          author
          <input
            type="text"
            name="author"
            value={this.state.author}
            onChange={this.handleChange}
          />
          <br />

          url
          <input
            type="text"
            name="url"
            value={this.state.url}
            onChange={this.handleChange}
          />
          <br />

          <button type="submit">create</button>
        </form>
      </div>
    )
  }
}

export default BlogForm
