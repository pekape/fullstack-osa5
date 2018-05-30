import React from 'react'

class Blog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showDetails: false,
      blog: props.blog
    }
  }

  toggleDetails = () => this.setState({ showDetails: !this.state.showDetails })

  render() {
    const blog = this.state.blog

    const blogStyle = {
      paddingTop: 10,
      paddingLeft: 2,
      border: 'dotted',
      borderWidth: 1,
      marginBottom: 5
    }

    return (
      <div style={blogStyle} onClick={this.toggleDetails}>
        {blog.title} {blog.author}
        <br />

        { this.state.showDetails &&
          <div>
            <a href={blog.url}>{blog.url}</a>
            <br />
            {blog.likes} likes
            <button>like</button>
            { blog.user &&
              <div>
                added by {blog.user.name}
              </div>
            }
          </div>
        }

      </div>
    )
  }
}

export default Blog
