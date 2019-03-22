import React from 'react'
import {accountData} from './../mock-data'
import DataTable from '../../components/table'
import PageHeader from "Components/pageheader"
import ProfileInfo from "./accountProfileInfo"
import ContactInfo from "./accountContactInfo"
import Wrapper from "Components/contentWrapper"
import Icon from "Components/icon"
import "./account.scss"

class Account extends React.Component {

  constructor() {
    super()
  }

  render() {
    return (
      <div id="account">
        <PageHeader pageName="My Account" />
        <Wrapper>
          <h4>My Profile</h4>
          <div style={{display: 'flex', borderBottom: '1px solid #dfe3e6'}}>
            <ProfileInfo
              name="RaviKumar"
              designation="Senior Partner Manager"
              password="*********"
            />
            <ContactInfo
              email="ravikuma@gmail.com"
              phone="9867512678"
            />
          </div>
          <h4>Notifications Preferences</h4>
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
          </div>
        </Wrapper>
      </div>
    )
  }
}

export default Account
