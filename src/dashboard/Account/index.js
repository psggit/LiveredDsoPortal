import React from 'react'
import { accountData } from './../mock-data'
import DataTable from '../../components/table'
import PageHeader from "Components/pageheader"
import Dialog from "Components/dialog"
import Button from "Components/button"
import ProfileInfo from "./accountProfileInfo"
import ContactInfo from "./accountContactInfo"
import Wrapper from "Components/contentWrapper"
import Icon from "Components/icon"
import "./account.scss"

class Account extends React.Component {

  constructor() {
    super()
    this.state = {
      newPassword: '',
      confirmPassword: '',
      showResetPasswordModal: false,
      showSuccessMessageModal: false
    }

    this.handleTextChange = this.handleTextChange.bind(this)
    this.mountResetPasswordModal = this.mountResetPasswordModal.bind(this)
    this.unMountModal = this.unMountModal.bind(this)
  }

  resetPassword() {
    console.log("reset password", this.state)
    this.unMountModal('resetPassword')
    this.setState({ showSuccessMessageModal: true })
  }

  mountResetPasswordModal() {
    this.setState({ showResetPasswordModal: true })
  }

  handleTextChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  unMountModal(modalName) {
    if (modalName === 'resetPassword') {
      this.setState({ showResetPasswordModal: false })
    } else {
      this.setState({ showSuccessMessageModal: false })
    }
  }

  render() {
    const { showResetPasswordModal, showSuccessMessageModal } = this.state
    return (
      <div id="account">
        <PageHeader pageName="My Account" />
        <Wrapper>
          <h4>My Profile</h4>
          <div className="profile-container">
            <ProfileInfo
              name="RaviKumar"
              designation="Senior Partner Manager"
              password="*********"
            />
            <ContactInfo
              email="ravikuma@gmail.com"
              phone="9867512678"
              mountModal={this.mountResetPasswordModal}
            />
          </div>
          {/* <h4>Notifications Preferences</h4>
          <div className="notification-container">
            <p className="label">Communication Channel</p>
            <div className="channel">
              <span className="icon">
                <Icon name="channelTick" />
              </span>
              <p>Text Message</p>
            </div>
            <div className="channel">
              <span className="icon">
                <Icon name="channelTick" />
              </span>
              <p>Email</p>
            </div>
          </div> */}
        </Wrapper>
        {showResetPasswordModal && (
          <Dialog
            title="Reset password"
            //subtitle="New API Key created"
            //inputBox={true}
            onClick={() => this.unMountModal('resetPassword')}
            actions={[
              <Button onClick={() => this.unMountModal('resetPassword')} secondary>
                Cancel
              </Button>,
              <Button onClick={() => this.resetPassword()} primary>
                Reset
              </Button>
            ]}
          >
            <p>New password</p>
            <input type="text" name="newPassword" onChange={this.handleTextChange} />
            <p>Verify new password</p>
            <input type="text" name="confirmPassword" onChange={this.handleTextChange} />
          </Dialog>
        )}
        {showSuccessMessageModal && (
          <Dialog
            title="Your password has been changed successfully"
            icon="success"
            onClick={() => this.unMountModal('showSuccessMessageModal')}
            actions={[
              <Button onClick={() => this.unMountModal('showSuccessMessageModal')} primary>
                Done
              </Button>, ``
            ]}
          />
        )}
      </div>
    )
  }
}

export default Account
