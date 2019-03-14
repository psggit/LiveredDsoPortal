import React from "react"
import PageHeader from "Components/pageheader"
import SupportTicketForm from './form'
import Icon from "Components/icon"

class SupportForm extends React.Component {

  constructor() {
    super() 

    this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }

  handleFormSubmit() {
    console.log("submit state", this.supportForm.getData())
  }

  render() {
    return (
      <div id="supportForm">
        <PageHeader pageName="Get in touch" />
        <p>Please share your queries/feedback. Our support team will contact you ASAP</p>
        <div className="main-container">
          <div className="ticket-form">
            <SupportTicketForm  ref={(node) => { this.supportForm = node }} handleSubmit={this.handleFormSubmit} />
          </div>
          <div className="contact-details">
            <p>You can also reach us via phone/email</p>
            <div className="icon">
              <Icon name="callButton" />
              <p className="contact-link">00 800 1008110</p>
            </div>
            <div className="icon">
              <Icon name="mailButton" />
              <p className="contact-link">support@livered.com</p>
            </div>
            <div className="footer">
              <p className="title">Operating hours</p>
              <p className="text">9:00 AM to 18:00 PM from Monday to Friday, Closed on Saturday and Sunday</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default SupportForm