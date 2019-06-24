import React from "react"
import "./../form-input.scss"

class TextInput extends React.Component {

  constructor() {
    super()

    this.state = {
      value: ""
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(evt, fieldName) {
    let fieldStatus = {}
    this.setState({ value: evt.target.value })
    fieldStatus = {
      fieldName,
      fieldValue: evt.target.value
    }
    this.props.onChange(fieldStatus)
  }

  render() {
    return (
      <input
        type="text"
        name={this.props.name}
        autoComplete="off"
        pattern="^[^-\s][a-zA-Z0-9_\s-]+$"
        onChange={(e) => this.handleChange(e, this.props.name)}
        value={this.state.value}
      />
    )
  }
}

export default TextInput

// TextInput.defaultProps = {
//   name: "default",
//   onChange: () => void(0)
// }

// TextInput.propTypes = {
//   name: PropTypes.string,
//   onChange: PropTypes.function
// }
