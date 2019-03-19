import React from "react"
import Label from 'Components/label'
import Select from "Components/select"
// import "./supportWithForm.scss"
import Icon from "Components/icon"
import Button from "Components/button"
import TextInput from "Components/form-inputs/text-input"
import EmailInput from "Components/form-inputs/email-input"

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
      selectedTimeRangeIdx: ""
    }

    this.dataType = [
      { text: "Transport Permits History (OTTPs)", value: 0 },
      { text: "Cancelled Transport Permits (OTTPs)", value: 1 },
      { text: "Credit History", value: 2 },
      { text: "User Log (list of all users)", value: 3 },
      { text: "Audit Log", value: 4 }
    ]

    this.timeRange = [
      { text: "Last 7 days", value: 0 },
      { text: "Last 14 days", value: 1 },
      { text: "Last 1 month", value: 2 },
      { text: "Last 3 months", value: 3 }
    ]

    this.stateList = [
      { state_short_name: "TN", text: "Tamilnadu", value: 0 },
      { state_short_name: "KA", text: "Bangalore", value: 1 }
    ]

    this.city = [
      { text: "Chennai", value: 0 },
      { text: "Erode", value: 1 }
    ]

    this.handleChange = this.handleChange.bind(this)
    this.handleSelectChange = this.handleSelectChange.bind(this)
    //this.handleTextareaChange = this.handleTextareaChange.bind(this)
    this.getData = this.getData.bind(this)
  }

  // handleChange(fieldStatusObj) {
  //   const errName = `${fieldStatusObj.fieldName}Err`
  //   if (!fieldStatusObj.status) {
  //     this.setState({
  //       [fieldStatusObj.fieldName]: fieldStatusObj.fieldValue,
  //       [errName]: {
  //         status: fieldStatusObj.status,
  //         value: fieldStatusObj.value
  //       }
  //     })
  //   } else {
  //     this.setState({
  //       [errName]: {
  //         status: fieldStatusObj.status,
  //         value: fieldStatusObj.value
  //       }
  //     })
  //   }
  // }

  handleChange(fieldStatusObj) {
    console.log("data", fieldStatusObj)
    this.setState({ [fieldStatusObj.fieldName]: fieldStatusObj.fieldValue })
  }

  // handleTextareaChange(e) {
  //   this.setState({message: e.target.value})
  // }

  handleSelectChange(e) {
    // if(fieldName.includes("reason")) {
    //   // console.log("reason", this.reason.find((item) => item.value === parseInt(e.target.value)).text)
    //   this.setState({
    //     selectedReasonIdx: parseInt(e.target.value),
    //     reason: this.reason.find((item) => item.value === parseInt(e.target.value)).text
    //   })
    // } else {
    //   this.setState({
    //     selectedUrgencyLevelIdx: parseInt(e.target.value),
    //     urgencyLevel: this.urgency_level.find((item) => item.value === parseInt(e.target.value)).text
    //   })
    // }
    console.log("name", e.target.name)
    switch(e.target.name) {
      case 'dataType':
        this.setState({
          selectedDataTypeIdx: parseInt(e.target.value),
          dataType: this.dataType.find((item) => item.value === parseInt(e.target.value)).text
        })
      break;

      case 'state':
        this.setState({
          selectedStateIdx: parseInt(e.target.value),
          state: this.stateList.find((item) => item.value === parseInt(e.target.value)).text
        })
      break;

      case 'city':
        this.setState({
          selectedCityIdx: parseInt(e.target.value),
          city: this.city.find((item) => item.value === parseInt(e.target.value)).text
        })
      break;

      case 'timeRange':
        this.setState({
          selectedTimeRangeIdx: parseInt(e.target.value),
          timeRange: this.timeRange.find((item) => item.value === parseInt(e.target.value)).text
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

  render() {
    return (
      <React.Fragment>
          <div className="input-field">
            <Label>
              Data Type <span>*</span>
            </Label>
            <Select 
              options={this.dataType} 
              name="dataType"  
              value={this.state.selectedDataTypeIdx}
              onChange={this.handleSelectChange} 
            />
          </div>
          <div className="row">
            <div className="input-field">
              <Label>
                Location <span>*</span>
              </Label>
              <Select 
                options={this.stateList} 
                name="state"  
                value={this.state.selectedStateIdx}
                onChange={this.handleSelectChange} 
              />
            </div>
            <div className="input-field">
              <Select 
                options={this.city} 
                name="city" 
                value={this.state.selectedCityIdx}
                onChange={this.handleSelectChange} 
              />
            </div>
        </div>
        <div className="input-field">
          <Label>
            Time range <span>*</span>
          </Label>
          <Select 
            options={this.timeRange} 
            name="timeRange"  
            value={this.state.selectedTimeRangeIdx}
            onChange={this.handleSelectChange} 
          />
        </div>
        <div className="input-field">
          <Label>
            Report Name (Opt)
          </Label>
          <TextInput name="reportName" onChange={this.handleChange} />
        </div>
         
      </React.Fragment>
    )
  }
}

export default ReportForm