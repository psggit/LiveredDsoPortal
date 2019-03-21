import React from "react"
import Wrapper from "Components/contentWrapper"
import PageHeader from "Components/pageheader"
import ReportForm from "./reportForm"
import "./report.scss"
import * as Api from "./../../api"
import {stateShortName} from "Utils/static-data"
import Dialog from "Components/dialog"
import Button from "Components/button"

class Reports extends React.Component {
  constructor() {
    super()
    this.state = {
      requestingReport: false,
      showSuccessDialog: false,
      reportFormKey: 0
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.successCallback = this.successCallback.bind(this)
    this.failureCallback = this.failureCallback.bind(this)
    this.unMountModal = this.unMountModal.bind(this)
  }

  unMountModal() {
    this.setState({reportFormKey: this.state.reportFormKey + 1, showSuccessDialog:false})
  }

  handleSubmit() {
    const formData = this.reportForm.getData()
    console.log("report form data", this.reportForm.getData(), stateShortName)
    this.setState({requestingReport: true})
    this.generateReport({
      data_type: formData.dataType,
      state: stateShortName,
      city_id: formData.selectedCityIdx.toString(),
      time_range: formData.timeRange,
      file_name: formData.reportName,
      file_type: formData.fileType
    })
  }

  generateReport(payloadObj) {
    if(payloadObj.data_type.includes("OTTP")) {
      Api.generateOttpReport (payloadObj, this.successCallback, this.failureCallback)
    } else {
      Api.generateCreditReport (payloadObj, this.successCallback, this.failureCallback)
    }
  }

  successCallback(response) {
    this.setState({requestingReport: false, showSuccessDialog: true})
    const formData = this.reportForm.getData()
    const filename = formData.reportName ? `${formData.reportName}.${formData.fileType}` : `export.${formData.fileType}`
    const data = formData.fileType === "csv" ? new TextDecoder("utf-8").decode(response.value) : response.value
    const blob = new Blob([data], { type: `text/${formData.fileType}` });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    console.log("success callback")
  }

  

  failureCallback() {
    this.setState({requestingReport: false})
    console.log("failure callback")
  }

  render() {
    return (
      <div id="reports" key={this.state.reportFormKey}>
        <PageHeader pageName="Reports" />
        {/* <Wrapper> */}
        <div className="form-wrapper">
          <ReportForm 
            ref={(node) => this.reportForm=(node)} 
            handleSubmit={this.handleSubmit} 
            disableRequestReport={this.state.requestingReport}
          />
        </div>
        {this.state.showSuccessDialog && (
          <Dialog
            title="Your request has been successfully downloaded"
            icon="success"
            onClick={this.unMountModal}
            actions={[
              <Button onClick={() => this.unMountModal()} primary>
                Done
              </Button>,``
            ]}
          />
        )}
      </div>
    )
  }
}

export default Reports