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
      selectedCsv: false,
      dataTypeErr: {
        value: "",
        status: false
      },
      timeRangeErr: {
        value: "",
        status: false
      },
      fileTypeErr: {
        value: "",
        status: false
      }
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
    this.handleSubmit = this.handleSubmit.bind(this)
    this.isFormValid = this.isFormValid.bind(this)
  }

  handleChange(fieldStatusObj) {
    console.log("data", fieldStatusObj)
    this.setState({ [fieldStatusObj.fieldName]: fieldStatusObj.fieldValue })
  }

  handleSelectChange(e) {
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

  isFormValid() {
    if(this.state.dataType.length === 0) {
      this.setState({
        dataTypeErr: {
          value: "Data type is required",
          status: true
        }
      })
      return false;
    } else if(this.state.timeRange.length === 0) {
      this.setState({
        timeRangeErr: {
          value: "Time range is required",
          status: true
        }
      })
      return false;
    } else if(this.state.fileType.length === 0) {
      this.setState({
        fileTypeErr: {
          value: "File type is required",
          status: true
        }
      })
      return false;
    } 
  }

  handleSubmit() {
    if(!this.isFormValid()) {
      this.props.handleSubmit()
    }
  }

  handleFileTypeChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {
    const {dataTypeErr, timeRangeErr, fileTypeErr} = this.state
    return (
      <React.Fragment>
          <div className="form-group">
            <Label>
              Data Type <span>*</span>
            </Label>
            <Select 
              options={this.dataType} 
              name="dataType"
              className="large"
              value={this.state.selectedDataTypeIdx}
              onChange={this.handleSelectChange} 
            />
            {
              dataTypeErr.status &&
              <p className="error-message">* {dataTypeErr.value}</p>
            }
          </div>
          <div className="row">
            <div className="form-group">
              <Label>
                Location
              </Label>
              <Select 
                options={this.stateList} 
                name="state"
                small 
                value={this.state.selectedStateIdx}
                onChange={this.handleSelectChange} 
              />
            </div>
            <div className="form-group">
              {/* <label></label> */}
              <Select 
                options={this.city} 
                name="city"
                small
                value={this.state.selectedCityIdx}
                onChange={this.handleSelectChange} 
              />
            </div>
        </div>
        <div className="form-group">
          <Label>
            Time Range <span>*</span>
          </Label>
          <div className="timerange-wrapper">
            <Select 
              options={this.timeRange} 
              name="timeRange" 
              small
              value={this.state.selectedTimeRangeIdx}
              onChange={this.handleSelectChange} 
            />
            {
              timeRangeErr.status &&
              <p className="error-message">* {timeRangeErr.value}</p>
            }
          </div>
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
          <Label>File Type *</Label>
          <div className="file-type">
            <span 
              onClick={() => { this.setState({ selectedPdf: !this.state.selectedPdf, fileType: 'pdf'}) } } 
              className="circle"
            >
              {
                !this.state.selectedPdf
                ? <Icon name="circle" />
                : <Icon name="filledCircle" />
              }
            </span>
            <span 
              onClick={() => { this.setState({ selectedPdf: !this.state.selectedPdf, fileType: 'pdf'}) } } 
              className="value"
            > 
              pdf 
            </span>
            <span 
              onClick={() => { this.setState({ selectedCsv: !this.state.selectedCsv, fileType: 'csv'}) } } 
              className="circle"
            >
              {
                !this.state.selectedCsv
                ? <Icon name="circle" />
                : <Icon name="filledCircle" />
              }
            </span>
            <span 
              className="value" 
              onClick={() => { this.setState({ selectedCsv: !this.state.selectedCsv, fileType: 'csv'}) } }
            > 
              csv 
            </span>
          </div>
          {
            fileTypeErr.status &&
            <p className="error-message">* {fileTypeErr.value}</p>
          }
        </div>
        <div className="form-group">
          <Button 
            primary 
            onClick={this.handleSubmit}
            disabled={this.props.disableRequestReport}
          >
            Request Report
          </Button>
        </div>
      </React.Fragment>
    )
  }
}

export default ReportForm