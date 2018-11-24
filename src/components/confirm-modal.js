import React from 'react'
import { render } from 'react-dom'
import { Dialog } from '@auth0/cosmos'

function ConfirmModal(data) {
  class ConfirmModal extends React.Component {
    constructor(props) {
      super(props)
      this.state = { open: true }
    }

    setDialogState(open) {
      this.setState({ open })
    }

    render() {
      return (
        <div>
          <Dialog
            open={this.state.open}
            title={this.props.title}
            onClose={() => this.setDialogState(false)}
            actions={[
              new Dialog.Action(
                'OK',
                this.props.handleConfirm,
                'primary'
              ),
              new Dialog.Action('Cancel', () => {
                this.setDialogState(false)
              })
            ]}
          >
            { this.props.message }
          </Dialog>
        </div>
      )
    }
  }

  render(<ConfirmModal {...data} />, document.getElementById('confirm-modal'))
}

export default ConfirmModal
