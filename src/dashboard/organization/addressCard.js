import React from "react"
import "Sass/card.scss"

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