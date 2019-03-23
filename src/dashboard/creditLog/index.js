import React from "react"
import PageHeader from "Components/pageheader"
import {creditsLog} from "./../mock-data"
import DataTable from "Components/table/custom-table"
//import DataTable from "Components/table"
import Pagination from "Components/pagination"
import Wrapper from "Components/contentWrapper"
import Moment from "moment"
import "./credit-log.scss"
import * as Api from "./../../api"
import { getQueryObj, getQueryUri } from "Utils/url-utils"

class CreditManagement extends React.Component {
  constructor() {
    super()

    this.state = {
      activeTab: 'credit-log',
      activePage: 1,
      limit: 10,
      creditLogs: [],
      creditLogCount: 0,
      loadingCreditLogs: false
    }

    this.pageLimit = 10

    this.creditLogTableHeaders = [
      // 'Transaction ID',
      // 'Date',
      // 'Time',
      // 'Mode of Payment',
      // 'Total Amount',
  
      {title: "Transaction ID", icon: ""},
      {title: "Date", icon: ""},
      {title: "Time", icon: ""},
      {title: "Mode of Payment", icon: ""},
      {title: "Total Amount", icon: ""},
    ]

    this.setActiveTab = this.setActiveTab.bind(this)
    this.successCallback = this.successCallback.bind(this)
    this.handlePageChange = this.handlePageChange.bind(this)
  }

  componentDidMount() {
    const queryUri = location.search.slice(1)
    const queryObj = getQueryObj(queryUri)

    Object.entries(queryObj).forEach((item) => {
      this.setState({ [item[0]]: item[1] })
    })

    this.fetchCreditLog({
      limit: queryObj.limit ? parseInt(queryObj.limit) : this.state.limit ,
      offset: queryObj.activePage ? parseInt(queryObj.limit * (queryObj.activePage - 1)) : 0
    })
  }

  fetchCreditLog(payload) {
    this.setState({loadingCreditLogs: true})
    Api.fetchCreditLog(payload, this.successCallback)
  }

  successCallback(response) {
    console.log("response", response)
    this.setState({
      creditLogs: response.credit_log, 
      creditLogCount: response.count,
      loadingCreditLogs: false
    })
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
    this.setState({
      activePage: pagerObj.activePage,
      limit: pagerObj.pageSize
    })
    this.fetchCreditLog({
      limit: pagerObj.pageSize,
      offset: pagerObj.activePage * (pagerObj.activePage - 1)
    })

    let queryParamsObj = {
      activePage: pagerObj.activePage,
      limit: pagerObj.pageSize
    }

    history.pushState(
      queryParamsObj,
      "credits",
      `/home/credits?${getQueryUri(queryParamsObj)}`
    )
  }

  render() {
    const {activeTab, creditLogs, creditLogCount, loadingCreditLogs} = this.state
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
                {/* <li
                  onClick={() => this.setActiveTab("add-credits")}
                  className={`${activeTab === "add-credits" ? 'active' : ''}`}
                >
                  <a href="/home/add-credits">Add Credits</a>
                </li> */}
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
                totalItemsCount={creditLogCount}
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
              loadingData={loadingCreditLogs}
              className="logs"
            >
            {
              !loadingCreditLogs &&
              creditLogs.length &&
              creditLogs.map((item, i) => {
                return (
                  <tr key={i}>
                    <td>{item.TransactionID}</td>
                    <td>{Moment(item.CreatedAt).format("DD/MM/YYYY")}</td>
                    <td>{Moment(item.CreatedAt).format("h:mm A")}</td>
                    {/* <td>{item.uploaded_by}</td>
                    <td>{item.authorized_by}</td> */}
                    <td>{item.PaymentMode}</td>
                    <td>{item.Amount}</td>
                    {/* <td>
                      <div className={item.status === "Credited" ? 'green' : 'orange'}>{item.status}</div>
                    </td> */}
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