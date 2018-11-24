import React from 'react'
import { Table } from '@auth0/cosmos'
import { Select } from '@auth0/cosmos'
import { Button } from '@auth0/cosmos'
import Layout from './layout'
import { POST } from 'Utils/fetch'
import { Icon, Spinner, List } from '@auth0/cosmos'
import Notify from 'Components/notify'
import openActionMenu from 'Components/actionsList'
import ConfirmModal from 'Components/confirm-modal'

class LiveOttp extends React.Component {
  constructor() {
    super()
    this.defaultFilters = {
      status: 'all'
    }

    this.state = {
      loading: false,
      data: [],
      count: 0,
      ...this.defaultFilters,
      actionListPos: null,
      canMountActionList: false
    }

    this.resetFilter = this.resetFilter.bind(this)
    this.setStatus = this.setStatus.bind(this)
    this.fetchDefaultData = this.fetchDefaultData.bind(this)
    this.mountOttpActionsMenu = this.mountOttpActionsMenu.bind(this)
    this.fetchLiveOTTP = this.fetchLiveOTTP.bind(this)
  }
  componentDidMount() {
    this.fetchDefaultData()
  }

  fetchDefaultData() {
    this.fetchLiveOTTP({
      offset: 0,
      limit: 40
    })
  }

  fetchLiveOTTP(data) {
    this.setState({ loading: true, data: [], count: 0 })
    POST({
      api: '/excisePortal/liveOttp',
      apiBase: 'agamotto',
      handleError: true,
      data
    })
      .then(json => {
        this.setState({
          data: json.data,
          count: json.count,
          loading: false
        })
      })
      .catch(err => {
        err.response.json().then(json => { Notify("danger", json.message) })
      })
  }

  resetFilter() {
    this.setState(Object.assign({}, this.state, this.defaultFilters))
    this.fetchDefaultData()
  }

  setStatus(e) {
    this.setState({ status: e.target.value })
    this.fetchLiveOTTP({
      offset: 0,
      limit: 40,
      status: e.target.value === 'all' ? undefined : e.target.value
    })
  }

  mountExtendOTTP() {
    // extend ottp
    ConfirmModal({
      handleConfirm: () => {},
      title: 'Confirm extend OTTP',
      message: 'Extending OTTP will charge you an additional fee, are you sure you want to extend OTTP?'
    })
  }

  mountRevokeOTTP() {
    // revoke ottp
  }

  mountOttpActionsMenu(e) {
    openActionMenu(
      e.target,
      [{
        label: 'Extend ottp',
        onClick: this.mountExtendOTTP
      }, {
        label: 'Revoke ottp',
        onClick: this.mountRevokeOTTP
      }]
    )
  }

  render() {
    return (
      <Layout title="In Progress OTTP">
        <div style={{ marginTop: '20px' }}>
          <div style={{
            width: '240px',
            display: 'inline-block',
            verticalAlign: 'bottom',
            marginRight: '20px'
          }}
          >
            <p style={{ margin: '10px 0' }}>OTTP status</p>
            <Select
              value={this.state.status}
              options={[
                { text: 'All', value: 'all' },
                { text: 'Returning', value: 'Returning' },
                { text: 'Ongoing', value: 'Ongoing' }
              ]}
              onChange={this.setStatus}
            />
          </div>
          <div
            style={{
              verticalAlign: 'bottom',
              display: 'inline-block'
            }}
          >
            <Button onClick={this.resetFilter} appearance="secondary">Reset</Button>
          </div>
        </div>
        <div style={{ marginTop: '40px' }}>
          <Table
            emptyMessage={this.state.loading ? <Spinner /> : 'No records found'}
            items={[{"ottp_id":"7802177460393655","ottp_issued_time":"2018-09-26T17:39:45.398625+05:30","ottp_expiry_time":"2018-09-27T17:39:45.398637+05:30","agent_name":"rohit(lenovo)","vehicle_number":"TN01 SC 3902","agency":"Hipbar","is_active":true,"retailer_name":"Chennai Retailer 1","ottp_status":"Delivered"},{"ottp_id":"45150714850203320","ottp_issued_time":"2018-09-26T17:43:34.104441+05:30","ottp_expiry_time":"2018-09-27T17:43:34.104452+05:30","agent_name":"rohit(lenovo)","vehicle_number":"TN01 SC 3902","agency":"Hipbar","is_active":true,"retailer_name":"Chennai Retailer 1","ottp_status":"Delivered"},{"ottp_id":"82499256534980281","ottp_issued_time":"2018-09-26T17:47:30.879794+05:30","ottp_expiry_time":"2018-09-27T17:47:30.879805+05:30","agent_name":"rohit(lenovo)","vehicle_number":"TN01 SC 3902","agency":"Hipbar","is_active":true,"retailer_name":"Chennai Retailer 1","ottp_status":"Delivered"},{"ottp_id":"119847793924789946","ottp_issued_time":"2018-09-26T17:51:28.522593+05:30","ottp_expiry_time":"2018-09-27T17:51:28.522626+05:30","agent_name":"rohit(lenovo)","vehicle_number":"TN01 SC 3902","agency":"Hipbar","is_active":true,"retailer_name":"Chennai Retailer 1","ottp_status":"Delivered"},{"ottp_id":"157196335609566907","ottp_issued_time":"2018-09-26T17:59:10.729735+05:30","ottp_expiry_time":"2018-09-27T17:59:10.729748+05:30","agent_name":"rohit(lenovo)","vehicle_number":"TN01 SC 3902","agency":"Hipbar","is_active":true,"retailer_name":"Chennai Retailer 1","ottp_status":"Delivered"},{"ottp_id":"194544872999376572","ottp_issued_time":"2018-09-26T18:02:24.005997+05:30","ottp_expiry_time":"2018-09-27T18:02:24.006011+05:30","agent_name":"rohit(lenovo)","vehicle_number":"TN01 SC 3902","agency":"Hipbar","is_active":true,"retailer_name":"Chennai Retailer 1","ottp_status":"Delivered"}]
          }
          >
            <Table.Column field="ottp_id" title="OTTP ID" />
            <Table.Column field="ottp_issued_time" title="OTTP generated at" />
            <Table.Column field="ottp_status" title="OTTP status" />
            <Table.Column field="agent_name" title="Agent name" />
            <Table.Column field="vehicle_number" title="Vehicle number" />
            <Table.Column field="retailer_name" title="Retailer" />
            <Table.Column>
              { item => <Icon style={{ cursor: 'pointer' }} onClick={this.mountOttpActionsMenu} field="" name="settings" size={20} color="default" /> }
            </Table.Column>
          </Table>
        </div>
      </Layout>
    )
  }
}

export default LiveOttp
