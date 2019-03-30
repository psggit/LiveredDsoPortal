import React from "react"
import "Sass/card.scss"
import PropTypes from "prop-types"

const AddressCard = ({headOffice, address, name, contact, email}) => (
  <div className="card-container">
    <div className="item">
      <p className="label">Head Office</p>
      <p className="value">{headOffice}</p>
    </div>

    <div className="item">
      <p className="label">Address</p>
      <p className="value">{address}</p>
    </div>

    <div className="item">
      <p className="label">Contact</p>
      <p className="value">{name}</p>
      <p className="value">{contact}</p>
      <p className="value">{email}</p>
    </div>
  </div>
)

export default AddressCard

AddressCard.defaultProps = {
  headOffice: undefined,
  address: undefined,
  name: undefined,
  contact: undefined,
  email: undefined    
}

AddressCard.propTypes = {
  headOffice: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  contact: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired
}