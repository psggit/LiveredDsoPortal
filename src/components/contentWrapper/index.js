import React from "react"
import "./wrapper.scss"

class contentWrapper extends React.Component {
  render() {
    return (
      <div id="wrapper">
        {this.props.children}
      </div>
    )
  }
}

export default contentWrapper