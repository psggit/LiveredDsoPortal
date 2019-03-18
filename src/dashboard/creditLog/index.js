import React from "react"
import PageHeader from "Components/pageheader"
import {creditsLog} from "./../mock-data"
import DataTable from "Components/table/custom-table"
//import DataTable from "Components/table"
import Pagination from "Components/pagination"
import Wrapper from "Components/contentWrapper"
import Moment from "moment"
import "./credit-log.scss"

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
      <div id="CreditLog">
        <PageHeader pageName="Credit Management" />
        <Wrapper>
          <div>
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
            {/* <DataTable
              headings={this.creditLogTableHeaders}
              rows={creditsLog}
              className="logs"
              //rowClick={this.handleRowClick}
            /> */}
            <DataTable
              headings={this.creditLogTableHeaders}
              loadingData={true}
              className="logs"
            >
            {
              creditsLog.length &&
              creditsLog.map((item, i) => {
                return (
                  <tr key={i}>
                    <td>{item.id}</td>
                    <td>{Moment(item.date).format("DD/MM/YYYY")}</td>
                    <td>{Moment(item.date).format("h:mm A")}</td>
                    <td>{item.uploaded_by}</td>
                    <td>{item.authorized_by}</td>
                    <td>{item.mode_of_payment}</td>
                    <td>{item.total_amount}</td>
                    <td>
                      <div className={item.status === "Credited" ? 'green' : 'orange'}>{item.status}</div>
                    </td>
                  </tr>
                )
              })
            }
            </DataTable>
          </div>
        </Wrapper>
      </div>
    )
  }
}

export default CreditManagement