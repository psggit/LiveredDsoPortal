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
      isSubmitting: false,
      showLoginErr: false,
      showForgotPasswordModal: false,
      showSuccessMessageModal: false,
      emailErr: {
        value: "",
        status: false
      },
      passwordErr: {
        value: "",
        status: false
      }
    }

    this.handleLogin = this.handleLogin.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleClick = this.handleClick.bind(this)
    this.mountModal = this.mountModal.bind(this)
  }

  handleKeyPress(e) {
    if (e.keyCode === 13) {
      this.handleLogin()
    }
  }

  handleLogin() {
    const { email, password } = this.state
    if (password.length && email.length) {
      this.setState({ isSubmitting: true })
      POST({
        api: "/retailer/auth/login",
        apiBase: "api1",
        handleError: false,
        data: { email, password }
      })
        .then((json) => {
          if (json.data) {
            Notify(JSON.parse(json.data).message, "warning")
          } else {
            createSession(json)
            window.location.href = "/home/overview"
          }
        })
        .catch((error) => {
          this.setState({ showLoginErr: true })
        })
    }
  }

  handlePasswordChange(evt) {
    const { password } = this.state
    const value = (evt.target.validity.valid || evt.target.validity.valueMissing) ? evt.target.value : eval((evt.target.name));
    this.setState({ [evt.target.name]:  value});
  }

  handleEmailChange(evt) {
    this.setState({ [evt.target.name]:  evt.target.value});
  }

  handleClick() {
    location.href="/home/support"
  }

  resetPassword(text) {
    console.log("email", text)
    this.setState({showForgotPasswordModal: false, showSuccessMessageModal: true})
  }

  mountModal() {
    this.setState({ showForgotPasswordModal: true })
  }

  unMountModal(modalName) {
    this.setState({ [modalName]: false })
  }

  render() {
    const { emailErr, passwordErr } = this.state
    return (
      <React.Fragment>
        <Header isLoggedIn={false} />
        <div id="login" className="container">
          <div className="wrapper">
            <h3 className="title">
              Login
            </h3>
            <div className="body">
              <React.Fragment>
                <form>
                  <div className="form-group">
                    <Label>Email Id</Label>
                    <input
                      type="text"
                      name="email"
                      pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
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
                      pattern="^[a-zA-Z0-9!#@]*$"
                      onInput={this.handlePasswordChange.bind(this)}
                      value={this.state.password}
                      required
                    />
                  </div>
                  <div className="form-group" style={{ textAlign: "center" }}>
                    <Button
                      onClick={this.handleLogin}
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
        </div>
        {this.state.showForgotPasswordModal && (
          <Dialog
            title="Forgot your password?"
            subtitle="Enter your email address to reset your password"
            inputBox={true}
            onClick={() => this.unMountModal('showForgotPasswordModal')}
            actions={[
              <Button onClick={() => this.resetPassword(this.state.text)} primary>
                Submit
              </Button>,
              <Button onClick={() => this.unMountModal('showForgotPasswordModal')} secondary>
                Cancel
              </Button>
            ]}
          />
        )}
        {this.state.showSuccessMessageModal && (
          <Dialog
            title="Please check your email to reset your password"
            icon="success"
            onClick={() => this.unMountModal('showSuccessMessageModal')}
            actions={[
              <Button onClick={() => this.unMountModal('showSuccessMessageModal')} primary>
                Done
              </Button>,``
            ]}
          />
        )}
      </React.Fragment>
    )
  }
}

export default Login
