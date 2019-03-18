import React from "react"
import PageHeader from "Components/pageheader"
import {creditsLog} from "./../mock-data"
import DataTable from "Components/table"
import Pagination from "Components/pagination"
import Wrapper from "Components/contentWrapper"
import "./credits.scss"

class CreditManagement extends React.Component {
  constructor() {
    super()

    this.state = {
      activeTab: 'credit-log',
      activePage: 1,
      limit: 10
    }

    this.creditLogTableHeaders = [
      'Transaction ID',
      'Date',
      'Time',
      'Uploaded By',
      'Authorized By',
      'Mode of Payment',
      'Total Amount',
      'Status'
    ]
    this.setActiveTab = this.setActiveTab.bind(this)
  }

  /**
   * Used to highlight the active tab
   * @param {String} activeTabName - Indicates the active tab name
   */
  setActiveTab(activeTabName) {
    this.setState({ activeTab: activeTabName })
  }

  /**
   * Navigates to next page
   * @param {object} pagerObj - Passed from pagination component
   * @param {Integer} pagerObj.activePage - Used to calculate the offset to fetch next set of credit log 
   * @param {Integer} pagerObj.pageSize - Used as limit to fetch next set of credit log
   */
  handlePageChange(pagerObj) {
   console.log("page change", pagerObj)
  }

  render() {
    const {activeTab} = this.state
    return (
      <div id="CreditManagement">
        <PageHeader pageName="Credit Management" />
        <Wrapper>
          <div className="header">
            <div style={{display: 'flex', marginTop: '4px'}}>
              <ul className="nav">
                <li 
                  onClick={() => this.setActiveTab("credit-log")} 
                  className={`${activeTab === "credit-log" ? 'active' : ''}`}
                >
                  <a href="/home/credit-log">Credit Log</a>
                </li>
                <li
                  onClick={() => this.setActiveTab("add-credits")}
                  className={`${activeTab === "add-credits" ? 'active' : ''}`}
                >
                  <a href="/home/add-credits">Add Credits</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="body">
            <p>CURRENT BALANCE</p>
            <h2>₹ 2,00,000</h2>
            <div className="pager">
              <Pagination
                activePage={this.state.activePage}
                pageSize={this.state.limit}
                totalItemsCount={100}
                onChangePage={this.handlePageChange}
              />
            </div>
            <DataTable
              headings={this.creditLogTableHeaders}
              rows={creditsLog}
              className="logs"
              //rowClick={this.handleRowClick}
            />
          </div>
        </Wrapper>
      </div>
    )
  }
}

export default CreditManagement