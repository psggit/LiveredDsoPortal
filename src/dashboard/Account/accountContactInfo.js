import React from "react"
import "Sass/card.scss"
import PropTypes from "prop-types"

const AccountContactInfo = ({email, phone}) => (
  <div className="card-container">
    <div className="item">
      <p className="label">Email Address</p>
      <p className="value">{email}</p>
    </div>

    <div className="item">
      <p className="label">Phone Number</p>
      <p className="value">{phone}</p>
    </div>
  </div>
)

export default AccountContactInfo

AccountContactInfo.defaultProps = {
  email: undefined,
  phone: undefined 
}

AccountContactInfo.propTypes = {
  name: PropTypes.string.isRequired,
  designation: PropTypes.string.isRequired
}