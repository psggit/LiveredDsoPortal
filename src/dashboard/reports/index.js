import React from "react"
import Wrapper from "Components/contentWrapper"
import PageHeader from "Components/pageheader"
import ReportForm from "./reportForm"
import "./report.scss"
import * as Api from "./../../api"
import {stateShortName} from "Utils/static-data"

class Reports extends React.Component {
  constructor() {
    super()
    this.state = {
      requestingReport: false
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.successCallback = this.successCallback.bind(this)
    this.failureCallback = this.failureCallback.bind(this)
  }

  handleSubmit() {
    const formData = this.reportForm.getData()
    console.log("report form data", this.reportForm.getData(), stateShortName)
    this.setState({requestingReport: true})
    this.generateReport({
      data_type: formData.dataType,
      state: stateShortName,
      city_id: formData.selectedCityIdx,
      time_range: formData.timeRange,
      file_name: formData.reportName,
      file_type: formData.fileType
    })
  }

  generateReport(payload) {
    Api.generateReport ({
      payload
    }, this.successCallback, this.failureCallback)
  }

  successCallback() {
    this.setState({requestingReport: false})
    console.log("success callback")
  }

  failureCallback() {
    this.setState({requestingReport: false})
    console.log("failure callback")
  }

  render() {
    return (
      <div id="reports">
        <PageHeader pageName="Reports" />
        {/* <Wrapper> */}
        <div className="form-wrapper">
          <ReportForm 
            ref={(node) => this.reportForm=(node)} 
            handleSubmit={this.handleSubmit} 
            disableRequestReport={this.state.requestingReport}
          />
        </div>
      </div>
    )
  }
}

export default Reports