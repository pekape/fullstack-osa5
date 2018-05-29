import React from 'react'

const Notification = ({ type, message }) => {
  if (message === null) {
    return <div className="notification"></div>
  }
  return <div className={`notification ${type}`}>{message}</div>
}

export default Notification
