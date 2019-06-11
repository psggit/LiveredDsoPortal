import React from "react"
import Label from 'Components/label'
import Select from "Components/select"
// import "./supportWithForm.scss"
import Icon from "Components/icon"
import Button from "Components/button"
import TextInput from "Components/form-inputs/text-input"
import "Sass/form.scss"

class ReportForm extends React.Component {
  constructor() {
    super()
    this.state = {
      dataType: "",
      state: "",
      city: "",
      timeRange: "",
      reportName: "",
      fileType: "",
      reportName: "",
      selectedDataTypeIdx: "",
      selectedStateIdx: "",
      selectedCityIdx: "",
      cityList: [],
      stateList: [],
    }

    this.dataType = [
      { text: "Transport Permits History (OTTPs)", value: 1 },
      { text: "Cancelled Transport Permits (OTTPs)", value: 2 },
      { text: "Credit History", value: 3 },
      // { text: "User Log (list of all users)", value: 4 },
      // { text: "Audit Log", value: 5 }
    ]
    this.handleChange = this.handleChange.bind(this)
    this.handleSelectChange = this.handleSelectChange.bind(this)
    this.handleTextFieldChange = this.handleTextFieldChange.bind(this)
    this.getData = this.getData.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.updateCityList = this.updateCityList.bind(this)
  }

  componentWillReceiveProps(newProps) {
    if (this.props.stateList !== newProps.stateList) {
      this.setState({
        stateList: newProps.stateList,
        // selectedStateIdx: newProps.stateList[0].value
      })
      const cityList = newProps.cityList.filter((item) => {
        if (parseInt(item.stateId) === parseInt(newProps.stateList[0].value)) {
          return item
        }
      })
      this.setState({
        cityList,
        // selectedCityIdx: cityList[0].value 
      })
    }
  }

  /**
   * Sets the textfield value
   * @param {Object} fieldStatusObj - Text field value
   */
  handleChange(fieldStatusObj) {
    this.setState({ [fieldStatusObj.fieldName]: fieldStatusObj.fieldValue })
  }

  /**
   * return the cityList array for a given stateId
   * @param {String} stateId 
   */
  updateCityList(stateId) {
    const cityList = this.props.cityList.filter((item) => {
      if (parseInt(item.stateId) === parseInt(stateId)) {
        return item
      }
    })
    this.setState({ cityList })
  }

  /**
   * Sets the dropdown value
   * @param {Object} e 
   */
  handleSelectChange(e) {
    const errName = `${e.target.name}Err`
    this.setState({
      [errName]: {
        value: "",
        status: false
      }
    })
    switch (e.target.name) {
      case 'dataType':
        this.setState({
          selectedDataTypeIdx: parseInt(e.target.value),
          dataType: this.dataType.find((item) => item.value === parseInt(e.target.value)).text
        })
        break;

      case 'state':
        this.setState({
          selectedStateIdx: parseInt(e.target.value),
          state: this.props.stateList.find((item) => item.value === parseInt(e.target.value)).text
        })
        this.updateCityList(e.target.value)
        break;

      case 'city':
        this.setState({
          selectedCityIdx: parseInt(e.target.value),
          city: this.props.cityList.find((item) => item.value === parseInt(e.target.value)).text
        })
        break;
    }
  }

  /**
   * Returns the state object
   */
  getData() {
    return this.state
  }

  handleTextFieldChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  /**
   * Submits the report request if form is valid
   */
  handleSubmit(e) {
    e.preventDefault()
    this.props.handleSubmit()
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <Label>
            Data Type <span>*</span>
          </Label>
          <Select
            options={this.dataType}
            name="dataType"
            className="large"
            required
            value={this.state.selectedDataTypeIdx}
            onChange={this.handleSelectChange}
          />
        </div>
        <div className="form-group">
          <Label>State</Label>
          <Select
            options={this.state.stateList}
            name="state"
            small
            required
            value={this.state.selectedStateIdx}
            onChange={this.handleSelectChange}
          />
        </div>
        <div className="form-group">
          <Label>City</Label>
          <Select
            options={this.state.cityList}
            name="city"
            small
            value={this.state.selectedCityIdx}
            onChange={this.handleSelectChange}
          />
        </div>
        <div className="form-group" style={{ position: 'relative' }}>
          <span className="calendar-icon">
            <Icon name="calendarIcon" />
          </span>
          <Label>From <span>*</span></Label>
          <input
            type="date"
            max="9999-12-31"
            name="fromDate"
            className="small"
            required
            onChange={this.handleTextFieldChange}
          />
        </div>
        <div className="form-group" style={{ position: 'relative' }}>
          <span className="calendar-icon">
            <Icon name="calendarIcon" />
          </span>
          <Label>To <span>*</span></Label>
          <input
            type="date"
            max="9999-12-31"
            name="toDate"
            className="small"
            required
            onChange={this.handleTextFieldChange}
          />
        </div>
        <div className="form-group">
          <Label>
            Report Name (Optional)
          </Label>
          <TextInput
            name="reportName"
            onChange={this.handleChange}
          />
        </div>
        <div className="form-group">
          <Button
            primary
            disabled={this.props.disableRequestReport}
          >
            Download Report
          </Button>
        </div>
      </form>
    )
  }
}

export default ReportForm