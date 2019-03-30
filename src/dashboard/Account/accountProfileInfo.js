import React from "react"
import "Sass/card.scss"
import PropTypes from "prop-types"

const AccountProfile = ({name, designation, password}) => (
  <div className="card-container">
    <div className="item">
      <p className="label">Name</p>
      <p className="value">{name}</p>
    </div>

    <div className="item">
      <p className="label">Designation</p>
      <p className="value">{designation}</p>
    </div>

    <div className="item">
      <p className="label">Password</p>
      <p className="value">{password}</p>
    </div>
    <div className="item">
      <p class="link">Reset Password</p>
    </div>
  </div>
)

export default AccountProfile

AccountProfile.defaultProps = {
  name: undefined,
  designation: undefined,
  password: undefined    
}

AccountProfile.propTypes = {
  name: PropTypes.string.isRequired,
  designation: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}