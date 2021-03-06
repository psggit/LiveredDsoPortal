import React from "react"
import PageHeader from "Components/pageheader"
import { creditsLog } from "./../mock-data"
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
      available_credit: 0,
      creditLogCount: 0,
      loadingCreditLogs: false
    }

    this.pageLimit = 10

    this.creditLogTableHeaders = [
      { title: "Transaction ID", icon: "" },
      { title: "Date", icon: "" },
      { title: "Time", icon: "" },
      { title: "Total Amount", icon: "" },
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
      dso_id: localStorage.getItem("dso-id"),
      limit: queryObj.limit ? parseInt(queryObj.limit) : this.state.limit,
      offset: queryObj.activePage ? parseInt(queryObj.limit * (queryObj.activePage - 1)) : 0
    })
  }

  fetchCreditLog(payload) {
    this.setState({ loadingCreditLogs: true })
    Api.fetchCreditLog(payload, this.successCallback)
  }

  successCallback(response) {
    // console.log("response", response)
    this.setState({
      creditLogs: response.credit_log,
      creditLogCount: response.count,
      loadingCreditLogs: false,
      available_credit: response.available_credit
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
    this.setState({
      activePage: pagerObj.activePage,
      limit: pagerObj.pageSize
    })
    this.fetchCreditLog({
      dso_id: localStorage.getItem("dso-id"),
      limit: parseInt(pagerObj.pageSize),
      offset: pagerObj.pageSize * (pagerObj.activePage - 1)
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
    const { activeTab, creditLogs, creditLogCount, loadingCreditLogs, available_credit } = this.state
    return (
      <div id="CreditLog">
        <PageHeader pageName="Credit Log" />
        <Wrapper>
          <div className="body">
            <p>CURRENT BALANCE</p>
            <h2>??? {available_credit}</h2>
            <div className="pager">
              <Pagination
                activePage={this.state.activePage}
                pageSize={this.state.limit}
                totalItemsCount={creditLogCount}
                onChangePage={this.handlePageChange}
              />
            </div>
            <DataTable
              headings={this.creditLogTableHeaders}
              loadingData={loadingCreditLogs}
              message="No credit log's found"
              className="logs"
            >
              {
                !loadingCreditLogs &&
                creditLogs.length > 0 &&
                creditLogs.map((item, i) => {
                  return (
                    <tr key={i}>
                      <td>{item.transaction_id}</td>
                      <td>{Moment(item.created_at).format("DD/MM/YYYY")}</td>
                      <td>{Moment(item.created_at).format("h:mm A")}</td>
                      <td>{item.amount}</td>
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