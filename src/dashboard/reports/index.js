import React from "react"
import Wrapper from "Components/contentWrapper"
import PageHeader from "Components/pageheader"
import ReportForm from "./reportForm"
import "./report.scss"
import * as Api from "./../../api"
import { stateShortName } from "Utils/static-data"
import Dialog from "Components/dialog"
import Button from "Components/button"
import Notify from "Components/notification"

class Reports extends React.Component {
  constructor() {
    super()
    this.state = {
      requestingReport: false,
      //showSuccessDialog: false,
      reportFormKey: 0,
      cityList: [],
      stateList: []
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.successCallback = this.successCallback.bind(this)
    this.failureCallback = this.failureCallback.bind(this)
  }

  componentDidMount() {
    this.fetchCityAndStates()
  }

  formatResponse(response) {
    const cityList = response.cities.map((item) => {
      return {
        text: item.city_name,
        value: item.id,
        stateId: item.StateId
      }
    })

    const stateList = response.states.map((item) => {
      return {
        text: item.state_name,
        value: item.id
      }
    })

    this.setState({ stateList, cityList })
  }

  fetchCityAndStates() {
    Api.fetchCityAndStates()
      .then((response) => {
        this.formatResponse(response)
      })
      .catch((err) => {
        console.log("Error in fetching state and cities", err)
        err.response.json().then(json => { Notify("danger", json.message) })
      })
  }

  /**
   * Formas payload and invokes tha generate report api
   */
  handleSubmit() {
    const formData = this.reportForm.getData()
    this.setState({ requestingReport: true })
    this.generateReport({
      data_type: formData.dataType,
      state: stateShortName,
      state_id: formData.selectedStateIdx.toString(),
      city_id: formData.selectedCityIdx.toString(),
      file_name: formData.reportName,
      dso_id: localStorage.getItem("dso-id"),
      from_date: new Date(formData.fromDate).toISOString(),
      to_date: new Date(formData.toDate).toISOString()
    })
  }

  /**
   * Baed on data_type request appropriate api service
   * @param {Object} payloadObj - payload object
   */
  generateReport(payloadObj) {
    if (payloadObj.data_type.toLowerCase().includes("credit")) {
      Api.generateCreditReport(payloadObj, this.successCallback, this.failureCallback)
    } else {
      Api.generateOttpReport(payloadObj, this.successCallback, this.failureCallback)
    }
  }

  /**
   * Based on file type downloads appropriate report from the api response
   * @param {Object} response - Api response
   */
  successCallback(response) {
    const formData = this.reportForm.getData()
    const filename = formData.reportName ? `${formData.reportName}.csv` : `export.csv`
    const data = new TextDecoder("utf-8").decode(response.value)
    const blob = new Blob([data], { type: `text/csv` });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    this.setState({ requestingReport: false, showSuccessDialog: true })
  }

  /**
   * Enables the Request report button
   */
  failureCallback() {
    this.setState({ requestingReport: false })
    console.log("failure callback")
  }

  render() {
    return (
      <div id="reports" key={this.state.reportFormKey}>
        <PageHeader pageName="Reports" />
        {/* <Wrapper> */}
        <div className="form-wrapper">
          <ReportForm
            ref={(node) => this.reportForm = (node)}
            handleSubmit={this.handleSubmit}
            disableRequestReport={this.state.requestingReport}
            cityList={this.state.cityList}
            stateList={this.state.stateList}
          />
        </div>
        {/* {this.state.showSuccessDialog && (
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
        )} */}
      </div>
    )
  }
}

export default Reports