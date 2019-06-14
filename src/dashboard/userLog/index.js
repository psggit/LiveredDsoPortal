import React from "react"
import PageHeader from "Components/pageheader"
import Wrapper from "Components/contentWrapper"
import * as Api from "./../../api"
import Icon from "Components/icon"
import DataTable from "Components/table/custom-table"
import { getQueryObj, getQueryUri } from "Utils/url-utils"
import Pagination from "Components/pagination"
import Search from "Components/search"

class UserLog extends React.Component {
  constructor() {
    super()

    this.filter = [{
      filterby: "dso_id",
      value: localStorage.getItem("dsoId")
    }]

    this.state = {
      activePage: 1,
      limit: 10,
      name: "",
      userLogs: [],
      userLogCount: 0,
      loadingUserLogs: false,
      filter: this.filter
    }

    this.userLogTableHeaders = [
      { title: "Name", icon: "" },
      { title: "Email", icon: "" },
      { title: "Designation", icon: "" },
      { title: "User Type", icon: "" },
      { title: "User Status", icon: "" },
    ]
    this.handlePageChange = this.handlePageChange.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.setName = this.setName.bind(this)
    this.fetchUserLog = this.fetchUserLog.bind(this)
    this.clearSearchResults = this.clearSearchResults.bind(this)
  }

  componentDidMount() {
    const queryUri = location.search.slice(1)
    const queryObj = getQueryObj(queryUri)

    Object.entries(queryObj).forEach((item) => {
      this.setState({ [item[0]]: item[1] })
    })
    const isSearchAlreadyApplied = queryObj.filter ? JSON.parse(decodeURI(queryObj.filter)).find((item) => item.filterby === "name") ? true : false : false
    if (isSearchAlreadyApplied) {
      this.setState({
        name: JSON.parse(decodeURI(queryObj.filter)).find((item) => item.filterby === "name").value
      })
    }

    this.fetchUserLog({
      limit: queryObj.limit ? parseInt(queryObj.limit) : this.state.limit,
      offset: queryObj.activePage ? parseInt(queryObj.limit * (queryObj.activePage - 1)) : 0,
      filter: queryObj.filter ? JSON.parse(decodeURI(queryObj.filter)) : this.state.filter
    })
  }

  fetchUserLog(payload) {
    this.setState({ loadingUserLogs: true })
    Api.fetchUserLog(payload)
      .then((response) => {
        this.setState({
          userLogs: response.dso_users,
          userLogCount: response.count,
          loadingUserLogs: false
        })
      })
      .catch((err) => {
        console.log("Error in fetching user logs", err)
      })
  }

  handleSearch(e) {
    const queryUri = location.search.slice(1)
    const queryObj = getQueryObj(queryUri)

    const filterObj = {
      filterby: "name",
      value: this.state.name
    }

    const isSearchAlreadyApplied = queryObj.filter
      ? JSON.parse(decodeURI(queryObj.filter)).find((item) => item.filterby === "name") ? true : false
      : false

    let filter = queryObj.filter ? JSON.parse(decodeURI(queryObj.filter)) : this.state.filter
    if (isSearchAlreadyApplied) {
      filter.pop()
    }

    const payload = {
      activePage: 1,
      limit: 10,
      offset: 0,
      filter: [...filter, filterObj]
    }

    const urlParams = {
      limit: 10,
      activePage: 1,
      filter: JSON.stringify([...filter, filterObj])
    }
    this.setState(payload)

    this.fetchUserLog(payload)
    history.pushState(
      urlParams,
      "userlog",
      `/home/user-log?${getQueryUri(urlParams)}`
    )
  }

  handlePageChange(pagerObj) {
    const queryUri = location.search.slice(1)
    const queryObj = getQueryObj(queryUri)
    let queryParamsObj = {}

    this.setState({
      activePage: pagerObj.activePage,
      limit: pagerObj.pageSize
    })

    this.fetchUserLog({
      limit: parseInt(pagerObj.pageSize),
      offset: pagerObj.pageSize * (parseInt(pagerObj.activePage) - 1),
      filter: queryObj.filter ? JSON.parse(decodeURI(queryObj.filter)) : this.state.filter
    })

    queryParamsObj = {
      limit: pagerObj.pageSize,
      activePage: pagerObj.activePage,
      filter: queryObj.filter ? (queryObj.filter) : JSON.stringify(this.state.filter)
    }

    history.pushState(
      queryParamsObj,
      "userlog",
      `/home/user-log?${getQueryUri(queryParamsObj)}`
    )
  }

  setName(searchText) {
    this.setState({
      name: searchText
    })
  }

  clearSearchResults() {
    if (this.state.filter.length > 0) {
      this.setState({
        filter: this.filter,
        name: ""
      });
      this.props.history.push(`/home/user-log`)
      this.fetchUserLog({
        limit: 10,
        offset: 0,
        filter: this.filter
      })
    }
  }

  render() {
    const { userLogs, loadingUserLogs, userLogCount, name } = this.state
    return (
      <div id="userLog">
        <PageHeader pageName="User Log" />
        <Wrapper>
          <div className="body">
            <Search
              placeholder="Search by name"
              setSearchText={this.setName}
              searchText={name}
              handleSearch={this.handleSearch}
              clearSearch={this.clearSearchResults}
            />
            <div className="pager">
              <Pagination
                activePage={this.state.activePage}
                pageSize={this.state.limit}
                totalItemsCount={userLogCount}
                onChangePage={this.handlePageChange}
              />
            </div>
            <DataTable
              headings={this.userLogTableHeaders}
              loadingData={loadingUserLogs}
              className="logs"
              message="No users found"
            >
              {
                !loadingUserLogs &&
                userLogs.length > 0 &&
                userLogs.map((item, i) => {
                  return (
                    <tr key={i}>
                      <td>{item.name}</td>
                      <td>{item.email}</td>
                      <td>{item.designation}</td>
                      <td>{item.roles[0].name}</td>
                      <td>
                        <div className="text-icon" style={{ display: 'flex', alignItems: 'center', color: "#000" }}>
                          <span style={{ marginRight: '5px' }}>
                            {item.is_active ? <Icon name="active" /> : <Icon name="expired" />}
                          </span>
                          <span>{item.is_active ? "Active" : "Inactive"}</span>
                        </div>
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

export default UserLog