import React from 'react'
import {accountData} from './../mock-data'
import DataTable from '../../components/table'
import PageHeader from "Components/pageheader"
// import { SSL_OP_DONT_INSERT_EMPTY_FRAGMENTS } from 'constants';

class Account extends React.Component {

  constructor() {
    super()
    this.state = {
      activeTab: 'account'
    }
    this.tableHeaders = [
      'User',
      'Type',
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

  handleRowClick() {
    console.log("row click")
  }

  render() {
    const {activeTab} = this.state
    return (
      <div id="myAccount">
        <PageHeader pageName="My Account" />
        <div style={{display: 'flex', marginBottom: '40px', marginTop: '4px'}}>
          <ul className="nav">
            <li 
              onClick={() => this.setActiveTab("account")} 
              className={`${activeTab === "account" ? 'active' : ''}`}
            >
              <a href="/home/account">My Account</a>
            </li>
            <li
              onClick={() => this.setActiveTab("user-permissions")}
              className={`${activeTab === "user-permissions" ? 'active' : ''}`}
            >
              <a href="/home/user-permissions">User Permissions</a>
            </li>
          </ul>
        </div>
        <DataTable
          headings={this.tableHeaders}
          rows={accountData}
          rowClick={this.handleRowClick}
        >
          {/* {
            accountData.map((item, i) => {
              return (
                <tr className="clickable" onClick={this.handleRowClick}>
                  <td>{item.user}</td>
                  <td>{item.type}</td>
                  <td>{item.is_active ? 'Active' : 'Ina   key={`row-${rowIndex}`} 
        onClick={this.props.rowClick ? this.props.rowClick : ''}>ctive'}</td>
                </tr>
              )
            })
          } */}
        </DataTable>
      </div>
    )
  }
}

export default Account
