import React from "react"
import "./../form-input.scss"

class PasswordInput extends React.Component {

  constructor() {
    super()
  }

  validateTextField({event, fieldName, fieldValue}) {
    let fieldStatus = {}
    const keyCode = event.keyCode ? event.keyCode :  event.which
    if(keyCode !== 32) {
      if (fieldValue.trim().length === 0) {
        fieldStatus = {
          status: true,
          value: `${fieldName} is required`,
          fieldName,
          fieldValue
        }
      } else {
        fieldStatus = {
          status: false,
          value: '',
          fieldName,
          fieldValue
        }
      }
      
      this.props.onChange(fieldStatus)
  
    } else {
      event.preventDefault()
    }
  }

  render() {
    return (
      <input 
        name={this.props.name} 
        type="password"
        autoComplete="off"
        onKeyUp={e => this.validateTextField({event: e, fieldName: this.props.name, fieldValue: e.target.value})}
      />
    )
  }
}

export default PasswordInput
