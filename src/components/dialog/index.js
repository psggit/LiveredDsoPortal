import React from 'react'
import Button from './../button'
import './dialog.scss'
import ButtonGroup from './../button-group/index.js'
import Icon from './../icon'

 class Dialog extends React.Component {

  constructor() {
    super()
    this.state = {
      text: ""
    }
    this.handlePress = this.handlePress.bind(this)
    this.handleTextChange = this.handleTextChange.bind(this)
  }

  componentDidMount() {
    document.addEventListener('click', this.handlePress)
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handlePress)
  }

  handlePress(e) {
    if (e.target.className === 'overlay-container') {
      this.props.onClick()
    }
  }

  handleTextChange(e) {
    this.setState({text: e.target.value})
  }

  render() {
    return (
      <div className="overlay-container">
        <div className="dialog--container">
        <div className="dialog--body">
            <div className="header">
              {
                this.props.icon &&
                <div className="column1">
                  <Icon name={this.props.icon} />
                </div>
              }
              <div  className={`column2 ${this.props.icon ? 'text' : undefined}`}>
                {
                  this.props.title
                  ? (
                    <div className="dialog--title-bar">
                      <p>
                        { this.props.title }
                      </p>
                    </div>
                  )
                  : ''
                }
                {
                  this.props.subtitle
                  ? (
                    <div className="dialog--subtitle-bar">
                      <p>
                        { this.props.subtitle }
                      </p>
                    </div>
                  )
                  : ''
                }
                {
                  this.props.inputBox &&
                  <input type="text" onChange={this.handleTextChange} />
                }
              </div>
            </div>
            { this.props.children }
          </div>
          <div className="dialog--footer">
          <ButtonGroup alignment="right">
              { this.props.actions.map(item => item) }
          </ButtonGroup>
          </div>
        </div>
      </div>
    ) 
  }
}

export default Dialog