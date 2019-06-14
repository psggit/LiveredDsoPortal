import React from "react"
import Button from "Components/button"
import Dialog from "Components/dialog"
//import "@sass/_animation.scss"
import { POST } from "Utils/fetch"
import { createSession } from "./session"
// import Notify from "Components/notification"
import Header from "Components/header"
import Label from "Components/label"
// import { validateEmail, validateTextField } from "Utils/validators"
import './login.scss'
import TextInput from "Components/form-inputs/text-input"
import EmailInput from "Components/form-inputs/email-input"

class Login extends React.Component {
  constructor() {
    super()
    this.state = {
      email: "",
      password: "",
      forgotPasswordEmail: "",
      isSubmitting: false,
      showLoginErr: false,
      showForgotPasswordModal: false,
      showSuccessMessageModal: false,
    }

    this.handleLogin = this.handleLogin.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleClick = this.handleClick.bind(this)
    this.mountModal = this.mountModal.bind(this)
    this.handleTextChange = this.handleTextChange.bind(this)
    this.resetPassword = this.resetPassword.bind(this)
  }

  handleKeyPress(e) {
    if (e.keyCode === 13) {
      this.handleLogin()
    }
  }

  handleLogin(e) {
    e.preventDefault()
    document.cookie = "livered=123;"
    createSession({ hasura_id: 123 })
    window.location.href = "/home/api"
    // const { email, password } = this.state
    // if (password.length && email.length) {
    //   this.setState({ isSubmitting: true })
    //   POST({
    //     api: "/retailer/auth/login",
    //     apiBase: "api1",
    //     handleError: false,
    //     data: { email, password }
    //   })
    //     .then((json) => {
    //       if (json.data) {
    //         Notify(JSON.parse(json.data).message, "warning")
    //       } else {
    //         createSession(json)
    //         window.location.href = "/home/overview"
    //       }
    //     })
    //     .catch((error) => {
    //       this.setState({ showLoginErr: true })
    //     })
    // }
  }

  handlePasswordChange(evt) {
    // const { password } = this.state
    // const value = (evt.target.validity.valid || evt.target.validity.valueMissing) ? evt.target.value : eval((evt.target.name));
    this.setState({ [evt.target.name]: evt.target.value });
  }

  handleEmailChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
  }

  handleClick() {
    location.href = "/home/support"
  }

  resetPassword() {
    this.setState({ showForgotPasswordModal: false, showSuccessMessageModal: true })
  }

  mountModal() {
    this.setState({ showForgotPasswordModal: true })
  }

  unMountModal(modalName) {
    this.setState({ [modalName]: false })
  }

  handleTextChange(e) {
    this.setState({ forgotPasswordEmail: e.target.value })
  }

  render() {
    // const { emailErr, passwordErr } = this.state
    return (
      <React.Fragment>
        <Header />
        <div id="login" className="container">
          <div className="wrapper">
            <h3 className="title">
              Login
            </h3>
            <div className="body">
              <React.Fragment>
                <form onSubmit={this.handleLogin}>
                  <div className="form-group">
                    <Label>Email Id</Label>
                    <input
                      type="text"
                      name="email"
                      pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                      onInput={this.handleEmailChange.bind(this)}
                      value={this.state.email}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <Label>Password</Label>
                    <input
                      type="password"
                      name="password"
                      pattern="^[^-\s][a-zA-Z0-9_\s-]+$"
                      onInput={this.handlePasswordChange.bind(this)}
                      value={this.state.password}
                      required
                    />
                  </div>
                  <div className="form-group" style={{ textAlign: "center" }}>
                    <Button
                      // onClick={this.handleLogin}
                      primary
                    >
                      Login
                    </Button>
                  </div>
                  <p onClick={this.mountModal}>Forgot your password?</p>
                </form>
              </React.Fragment>
            </div>
            {this.state.showLoginErr && (
              <p className="login-error">
                Wrong username or password
              </p>
            )}
          </div>
          <p style={{
            textAlign: "center",
            marginTop: "24px",
            cursor: "pointer",
          }}
            onClick={this.handleClick}
          >
            Having trouble? Contact Support
          </p>
        </div>
        {this.state.showForgotPasswordModal && (
          <Dialog
            title="Forgot your password?"
            subtitle="Enter your email address to reset your password"
            onClick={() => this.unMountModal('showForgotPasswordModal')}
            actions={[
              <Button onClick={() => this.resetPassword()} primary>
                Submit
              </Button>,
              <Button onClick={() => this.unMountModal('showForgotPasswordModal')} secondary>
                Cancel
              </Button>
            ]}
          >
            <input type="text" className="large" onChange={this.handleTextChange} />
          </Dialog>
        )}
        {this.state.showSuccessMessageModal && (
          <Dialog
            title="Please check your email to reset your password"
            icon="success"
            onClick={() => this.unMountModal('showSuccessMessageModal')}
            actions={[
              <Button onClick={() => this.unMountModal('showSuccessMessageModal')} primary>
                Done
              </Button>, ``
            ]}
          />
        )}
      </React.Fragment>
    )
  }
}

export default Login
