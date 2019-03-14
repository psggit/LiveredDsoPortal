import React from "react"
import Button from "Components/button"
//import "@sass/_animation.scss"
import { POST } from "Utils/fetch"
import { createSession } from "./session"
import Notify from "Components/notification"
import Header from "Components/header"
import Label from "Components/label"
import { validateEmail, validateTextField } from "Utils/validators"
import './login.scss'

class Login extends React.Component {
  constructor() {
    super()
    this.state = {
      email: "",
      password: "",
      isSubmitting: false,
      showLoginErr: false,
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
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleClick = this.handleClick.bind(this)
  }

  handleKeyPress(e) {
    if (e.keyCode === 13) {
      this.handleLogin()
    }
  }

  handleLogin() {
    const { email, password } = this.state
    const emailErr = validateEmail({
      fieldName: "Email ID",
      fieldValue: email
    })
    this.setState({ emailErr })

    const passwordErr = validateTextField({
      fieldName: "Password",
      fieldValue: password
    })
    this.setState({ passwordErr })

    if (!emailErr.status && !passwordErr.status) {
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

  handlePassword(e) {
    this.setState({ password: e.target.value, showLoginErr: false })
  }

  handleEmailChange(e) {
    this.setState({ email: e.target.value, showLoginErr: false })
  }

  handleClick() {
    location.href="/home/support"
  }

  render() {
    const submittingStyle = {
      cursor: "progress",
      opacity: "0.7"
    }
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
              <div className="form-group">
                <Label>Email Id</Label>
                <input
                  spellCheck={false}
                  onKeyDown={this.handleKeyPress}
                  onChange={this.handleEmailChange}
                  style={{ width: "100%" }}
                  type="text"
                  name="email"
                  autoComplete="off"
                  className={`${emailErr.status ? "error" : undefined}`}
                />
                {emailErr.status && <p className="__error">{emailErr.value}</p>}
              </div>
              <div className="form-group">
                <Label>Password</Label>
                <input
                  onKeyDown={this.handleKeyPress}
                  onChange={this.handlePassword}
                  style={{ width: "100%" }}
                  type="password"
                  name="password"
                  className={`${passwordErr.status ? "error" : undefined}`}
                />
                {passwordErr.status && (
                  <p className="__error">{passwordErr.value}</p>
                )}
              </div>
              <div className="form-group" style={{ textAlign: "center" }}>
                <Button
                  onClick={this.handleLogin}
                  className={`${this.state.isSubmitting} ? 'submit-btn' : ''`}
                  // style={
                  //   this.state.isSubmitting
                  //     ? submittingStyle
                  //     : { boxShadow: "0 2px 4px 0 #333" }
                  // }
                  primary
                >
                  Login
                </Button>
              </div>
              <p className="footer" onClick={this.handleClick}>
                Having trouble? Contact Support
              </p>
            </React.Fragment>
          </div>
            {this.state.showLoginErr && (
              <p className="login-error">
                Wrong username or password
              </p>
            )}
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default Login
