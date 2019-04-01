import React from "react"
import "Sass/card.scss"
import PropTypes from "prop-types"

const AccountContactInfo = ({email, phone, mountModal}) => (
  <div className="card-container">
    <div className="item">
      <p className="label">Email Address</p>
      <p className="value">{email}</p>
    </div>

    <div className="item">
      <p className="label">Phone Number</p>
      <p className="value">{phone}</p>
    </div>
    <div className="item" onClick={mountModal}>
      <p class="link">Reset Password</p>
    </div>
  </div>
)

export default AccountContactInfo

AccountContactInfo.defaultProps = {
  email: undefined,
  phone: undefined,
  mountModal: undefined    
}

AccountContactInfo.propTypes = {
  email: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  mountModal: PropTypes.func.isRequired
}