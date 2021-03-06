import React from "react";
import "./header.scss";
import Icon from "./../icon";
import Dialog from "./../dialog";
import Button from "./../button";
import { POST } from "Utils/fetch";

class Header extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showLogoutModal: false,
      isLoggedIn: localStorage.getItem("hasura-id")
    }
    this.logout = this.logout.bind(this)
    this.mountLogoutModal = this.mountLogoutModal.bind(this)
    this.unMountLogoutModal = this.unMountLogoutModal.bind(this)
    this.openDropdown = this.openDropdown.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  mountLogoutModal() {
    this.setState({ showLogoutModal: true })
  }

  unMountLogoutModal() {
    console.log("unmount modal")
    this.setState({ showLogoutModal: false })
  }

  openDropdown() {
    console.log("open dropdown")
    this.setState({ showDropdown: !this.state.showDropdown })
  }

  logout() {
    this.setState({ showLogoutModal: false })
    localStorage.clear()
    document.cookie = "livered=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    location.href = "/login"
    // POST({
    //   api: "/retailer/auth/user/logout",
    //   apiBase: "api1",
    //   handleError: false,
    //   cors: true
    // })
    //   .then(response => {
    //     if (response.status !== 200) {
    //       console.log(
    //         `Looks like there was a problem. Status Code: ${response.status}`
    //       )
    //       localStorage.clear()
    //       location.href = "/login"
    //       return
    //     }
    //     response.json().then(data => {
    //       localStorage.clear()
    //       location.href = "/login"
    //     })
    //   })
    //   .catch(err => {
    //     console.log("Fetch Error :-S", err)
    //     localStorage.clear()
    //     location.href = "/login"
    //   })
  }

  handleClick() {
    console.log("click")
    location.href = "/home/account"
  }

  render() {
    const { showLogoutModal, showDropdown, isLoggedIn } = this.state
    return (
      <div id="pageHeader" className="page-header">

        <div className="logo">
          <Icon name="liveredLogo" />
          {
            isLoggedIn &&
            <p onClick={this.mountLogoutModal}>Logout</p>
          }
          {/* {
            this.state.isLoggedIn &&
            <span onClick={this.openDropdown} className="icon">
              <Icon name="overflowMenu" />
            </span>
          } */}
        </div>


        {/* <div
          className={`dropdown-menu ${showDropdown ? "show" : "hide"}`}
        >
          <div className="menu-item" onClick={this.handleClick}>
            My Account
          </div>
          <div
            onClick={() => this.mountLogoutModal()}
            className="menu-item"
          >
            Logout
          </div>
        </div>
         */}

        {showLogoutModal && (
          <Dialog
            title="Do you want to logout?"
            onClick={this.unMountLogoutModal}
            actions={[
              <Button onClick={() => this.unMountLogoutModal()} secondary>
                No
              </Button>,
              <Button onClick={() => this.logout()} primary>
                Yes
              </Button>
            ]}
          />
        )}
      </div>
    );
  }
}

export default Header;
