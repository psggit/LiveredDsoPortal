import React from "react"
import Label from 'Components/label'
import Select from "Components/select"
// import "./supportWithForm.scss"
import Icon from "Components/icon"
import Button from "Components/button"
import TextInput from "Components/form-inputs/text-input"
import EmailInput from "Components/form-inputs/email-input"
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
      selectedTimeRangeIdx: "",
      selectedPdf: false,
      selectedCsv: false
    }

    this.dataType = [
      { text: "Transport Permits History (OTTPs)", value: 1 },
      { text: "Cancelled Transport Permits (OTTPs)", value: 2 },
      { text: "Credit History", value: 3 },
      { text: "User Log (list of all users)", value: 4 },
      { text: "Audit Log", value: 5 }
    ]

    this.timeRange = [
      { text: "Last 7 days", value: 1 },
      { text: "Last 14 days", value: 2 },
      { text: "Last 1 month", value: 3 },
      { text: "Last 3 months", value: 4 }
    ]

    this.stateList = [
      { state_short_name: "TN", text: "Tamilnadu", value: 1 },
      { state_short_name: "KA", text: "Bangalore", value: 2 }
    ]

    this.city = [
      { text: "Chennai", value: 1 },
      { text: "Erode", value: 2 }
    ]

    this.handleChange = this.handleChange.bind(this)
    this.handleSelectChange = this.handleSelectChange.bind(this)
    this.handleFileTypeChange = this.handleFileTypeChange.bind(this)
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
    console.log("name", e.target.name, e.target.value, this.dataType.find((item) => item.value === parseInt(e.target.value)).text)
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

  handleFileTypeChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {
    return (
      <React.Fragment>
          <div className="form-group">
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
            <div className="form-group">
              <Label>
                Location
              </Label>
              <Select 
                options={this.stateList} 
                name="state"  
                value={this.state.selectedStateIdx}
                onChange={this.handleSelectChange} 
              />
            </div>
            <div className="form-group">
              {/* <label></label> */}
              <Select 
                options={this.city} 
                name="city" 
                value={this.state.selectedCityIdx}
                onChange={this.handleSelectChange} 
              />
            </div>
        </div>
        <div className="form-group">
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
        <div className="form-group">
          <Label>
            Report Name (Opt)
          </Label>
          <TextInput name="reportName" onChange={this.handleChange} />
        </div>
        <div className="form-group">
          <Label>Gender *</Label>
          <div className="file-type">
            <span onClick={() => { this.setState({ selectedPdf: !this.state.selectedPdf}) } } className="circle">
              {
                !this.state.selectedPdf
                ? <Icon name="circle" />
                : <Icon name="filledCircle" />
              }
            </span>
            <span onClick={() => { this.setState({ selectedPdf: !this.state.selectedPdf}) } } className="value"> pdf </span>
             <span onClick={() => { this.setState({ selectedCsv: !this.state.selectedCsv}) } } className="circle">
              {
                !this.state.selectedCsv
                ? <Icon name="circle" />
                : <Icon name="filledCircle" />
              }
            </span>
            <span className="value" onClick={() => { this.setState({ selectedCsv: !this.state.selectedCsv}) } }> Csv </span>
          </div>
        </div>
        <div className="form-group">
          <Button primary>Request Report</Button>
        </div>
      </React.Fragment>
    )
  }
}

export default ReportForm