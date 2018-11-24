import React from 'react'
import { Dialog, Button } from '@auth0/cosmos'
import DayPicker from 'react-day-picker'
import './date-picker.scss'
import { format } from 'Utils/date-utils'

class DatePicker extends React.Component {
  constructor(props) {
    super(props)
    this.state = { open: false }
    this.setFromDate = this.setFromDate.bind(this)
    this.setToDate = this.setToDate.bind(this)
    this.state = {
      error: false,
      fromDate: props.from,
      toDate: props.to
    }
  }

  setDialogState(open) {
    this.setState({ open })
  }

  setFromDate(day) {
    const { toDate } = this.state
    if (toDate) {
      this.setState({error: false})
    }
    this.setState({
      fromDate: day
    })
  }

  setToDate(day) {
    const { fromDate } = this.state
    if (fromDate) {
      this.setState({error: false})
    }
    this.setState({
      toDate: day
    })
  }

  render() {
    return (
      <div>
        <Dialog
          open={this.state.open}
          title="Choose date"
          onClose={() => this.setDialogState(false)}
          actions={[
            new Dialog.Action(
              'OK',
              () => {
                this.props.setDate(this.state.fromDate, this.state.toDate)
                this.props.unmountDatePicker()
              },
              'primary'
            ),
            new Dialog.Action('Cancel', this.props.unmountDatePicker)
          ]}
        >
          <div style={{ display: 'flex' }}>
            <DayPicker
              onDayClick={this.setFromDate}
              selectedDays={this.state.fromDate}
              month={(new Date(this.state.fromDate))}
            />
            <DayPicker
              onDayClick={this.setToDate}
              selectedDays={this.state.toDate}
              month={(new Date(this.state.toDate))}
            />
          </div>
          {
            this.state.fromDate && this.state.toDate
            ? <p style={{textAlign: 'center', marginTop: '20px', fontWeight: '600'}}>
              From: {format(this.state.fromDate)}
              &nbsp;&nbsp;
              To: {format(this.state.toDate)}
              </p>
            : ''
          }
          {
            this.state.error
            ? <p style={{color: '#ff3b34', textAlign: 'center', marginTop: '20px'}}>Please select both the dates</p>
            : ''
          }
        </Dialog>
      </div>
    )
  }
}

export default DatePicker
