import React from 'react'
import { Table } from '@auth0/cosmos'
import { Select } from '@auth0/cosmos'
import { Button } from '@auth0/cosmos'
import { TextInput } from '@auth0/cosmos'
import { Spinner, Alert } from '@auth0/cosmos'
import Layout from './layout'
import { POST } from 'Utils/fetch'
import { getTodayAndTomorrow, format } from 'Utils/date-utils'
//import iconsMap from 'Utils/getIcon'
import DatePicker from 'Components/date-picker'
import Notify from 'Components/notify'

class HistoryOttp extends React.Component {
  constructor() {
    super()
    this.defaultFilters = {
      from: getTodayAndTomorrow().today,
      to: getTodayAndTomorrow().tomorrow,
      status: 'all'
    }

    this.state = {
      loading: false,
      data: [],
      count: null,
      ...this.defaultFilters
    }

    this.mountDatePicker = this.mountDatePicker.bind(this)
    this.unmountDatePicker = this.unmountDatePicker.bind(this)
    this.setDate = this.setDate.bind(this)
    this.setStatus = this.setStatus.bind(this)
    this.resetFilter = this.resetFilter.bind(this)
    this.fetchDefaultData = this.fetchDefaultData.bind(this)
    this.fetchHistoryOTTP = this.fetchHistoryOTTP.bind(this)
  }
  componentDidMount() {
    this.fetchDefaultData()
  }

  fetchDefaultData() {
    this.fetchHistoryOTTP({
      offset: 0,
      limit: 40,
      from_date: this.state.from.toISOString(),
      to_date: this.state.to.toISOString()
    })
  }

  fetchHistoryOTTP(data) {
    this.setState({ loading: true, data: [], count: 0 })
    POST({
      api: '/excisePortal/ottpHistory',
      apiBase: 'agamotto',
      handleError: true,
      data
    })
      .then((json) => {
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
    this.setState(Object.assign({}, this.state, this.defaultFilters), () => {
      this.fetchDefaultData()
    })
  }

  setDate(from, to) {
    this.setState({ from, to })
    this.fetchHistoryOTTP({
      offset: 0,
      limit: 40,
      from_date: from.toISOString(),
      to_date: to.toISOString(),
      status: this.state.status === 'all' ? undefined : this.state.status
    })
  }

  setStatus(e) {
    this.setState({ status: e.target.value })
    this.fetchHistoryOTTP({
      offset: 0,
      limit: 40,
      from_date: this.state.from.toISOString(),
      to_date: this.state.to.toISOString(),
      status: e.target.value === 'all' ? undefined : e.target.value
    })
  }

  mountDatePicker() {
    this.datePicker.setDialogState(true)
  }

  unmountDatePicker() {
    this.datePicker.setDialogState(false)
  }

  render() {
    const { to, from } = this.state
    return (
      <Layout title="OTTP History">
        <div style={{ marginTop: '20px' }}>
          <div onClick={this.mountDatePicker} style={{
            width: '240px',
            display: 'inline-block',
            verticalAlign: 'bottom',
            marginRight: '20px'
          }}
          >
            <p style={{ margin: '10px 0' }}>OTTP Date Range</p>
            <div style={{ position: 'relative' }}>
              <span
                style={{
                  position: 'absolute',
                  top: '50%',
                  right: '10px',
                  transform: 'translateY(-50%)'
                }}>
                { iconsMap.calendar }
              </span>
              <TextInput
                disabled
                placeholder=""
                type="text"
                size="default"
                value={`${format(from)} - ${format(to)}`}
              />
            </div>
          </div>

          <div style={{
            width: '240px',
            display: 'inline-block',
            verticalAlign: 'bottom',
            marginRight: '20px'
          }}
          >
            <p style={{ margin: '10px 0' }}>OTTP Status</p>
            <Select
              value={this.state.status}
              options={[
                { text: 'All', value: 'all' },
                { text: 'Returned', value: 'Returned' },
                { text: 'Delivered', value: 'Delivered' }
              ]}
              onChange={this.setStatus}
            />
          </div>
          <div
            style={{
              verticalAlign: 'bottom',
              display: 'inline-block',
              marginRight: '20px'
            }}
          >
            <Button onClick={this.resetFilter} appearance="secondary">Reset</Button>
          </div>
          <div
            style={{
              verticalAlign: 'bottom',
              display: 'inline-block',
            }}
          >
            <Button onClick={this.resetFilter} appearance="default">Download OTTP report</Button>
          </div>
        </div>
        <div style={{ marginTop: '40px' }}>
          <Table
            emptyMessage={this.state.loading ? <Spinner /> : 'No records found'}
            items={this.state.data}
          >
            <Table.Column field="ottp_id" title="OTTP ID" />
            <Table.Column field="ottp_issued_time" title="OTTP generated at" />
            <Table.Column field="ottp_status" title="OTTP status" />
            <Table.Column field="agent_name" title="Agent name" />
            <Table.Column field="vehicle_number" title="Vehicle number" />
            <Table.Column field="retailer_name" title="Retailer" />
          </Table>
        </div>
        <DatePicker
          setDate={this.setDate}
          unmountDatePicker={this.unmountDatePicker}
          ref={(node) => { this.datePicker = node }}
          from={this.state.from}
          to={this.state.to}
        />
      </Layout>
    )
  }
}

export default HistoryOttp
