import React from "react"
import Wrapper from "Components/contentWrapper"
import PageHeader from "Components/pageheader"
import ReportForm from "./reportForm"
import "./report.scss"

class Reports extends React.Component {
  constructor() {
    super()
  }

  handleSubmit() {
    console.log("report form data", this.reportForm.getData())
  }

  render() {
    return (
      <div id="reports">
        <PageHeader pageName="Reports" />
        {/* <Wrapper> */}
        <div className="form-wrapper">
          <ReportForm ref={(node) => this.reportForm=(node)} handleSubmit={this.handleSubmit} />
        </div>
          
        {/* </Wrapper> */}
      </div>
    )
  }
}

export default Reports