import React from 'react'
import './select.scss'
import Icon from './../icon'

class Select extends React.Component {
  constructor() {
    super()
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange(e) {
    // console.log(e.target.value)
    this.props.onChange(e)
  }
  render() {
    //console.log("props", this.props)
    return (
      <div className="select--container">
        <span>
          <Icon name="down-small" size="10" />
        </span>
        <select
          placeholder={this.props.placeholder}
          className={`select ${this.props.small ? 'small' : 'large'}`}
          name={this.props.name}
          onChange={this.handleChange}
          required={this.props.required}
          value={this.props.value && this.props.value >= 0 ? this.props.value : ''}
        >
          {
            this.props.name && !this.props.value &&
            <option value="" disabled selected>
              Choose a {this.props.name}
            </option>
          }
          {
            this.props.options.map((item, i) => (
              <option key={i} value={item.value}>{item.text}</option>
            ))
          }
        </select>
      </div>
    )
  }
}

export default Select