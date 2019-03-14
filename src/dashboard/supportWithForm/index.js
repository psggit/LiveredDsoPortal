import React from "react"
import PageHeader from "Components/pageheader"
import SupportTicketForm from './form'
import Icon from "Components/icon"
import * as Api from "./../../api"
import "./supportWithForm.scss"

class SupportForm extends React.Component {

  constructor() {
    super() 
    this.state = {
      formErr: false
    }
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }

  handleFormSubmit() {
    // console.log("submit state", this.supportForm.getData())
    const formData = this.supportForm.getData()
    if(formData.name.length && formData.email.length && formData.designation.length) {
      this.createComplaint({
        name: formData.name,
        email: formData.email,
        reason: formData.reason,
        urgency: formData.urgencyLevel,
        message: formData.message,
        confirmation: formData.isConfirmation,
        dso_id: "SW123"
      }, this.successCallback, this.failureCallback)
    } else {
      this.setState({formErr: true})
    }
  }

  successCallback(response) {
    console.log("success")
  }

  failureCallback(error) {
    console.log("failue")
  }

  createComplaint(payloadObj, successCallback, failureCallback) {
    Api.createComplaint(payloadObj, successCallback, failureCallback)
  }

  render() {
    return (
      <div id="supportForm">
        <PageHeader pageName="Get in touch" />
        <p className="sub-header">Please share your queries/feedback. Our support team will contact you ASAP</p>
        <div className="main-container">
          <div className="ticket-form">
            <SupportTicketForm  ref={(node) => { this.supportForm = node }} handleSubmit={this.handleFormSubmit} />
            {
              this.state.formErr &&
              <p className="error-message">Please fill the required fields</p>
            }
          </div>
          <div className="contact-details">
            <p className="sub-header">You can also reach us via phone/email</p>
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