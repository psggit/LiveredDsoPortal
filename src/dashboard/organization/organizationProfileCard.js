import React from "react"
import "Sass/card.scss"
import PropTypes from "prop-types"

const ProfileCard = ({ dsoName, entityType, headOffice, address, name, contact, email }) => (
  <React.Fragment>
    <div className="card-container">
      <h3>Profile</h3>
      <div className="row">
        <div className="column">
          <div className="item">
            <p className="label">
              Name of Entity
            </p>
            <p className="value">{dsoName}</p>
          </div>
          <div className="item">
            <p className="label">Type of Entity</p>
            <p className="value">{entityType}</p>
          </div>
        </div>
        <div className="column">
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
      </div>
    </div>
  </React.Fragment>
)

export default ProfileCard

ProfileCard.defaultProps = {
  dsoName: undefined,
  entityType: undefined,
  headOffice: undefined,
  address: undefined,
  name: undefined,
  contact: undefined,
  email: undefined
}

ProfileCard.propTypes = {
  dsoName: PropTypes.string.isRequired,
  entityType: PropTypes.string,
  headOffice: PropTypes.string,
  address: PropTypes.string,
  name: PropTypes.string,
  contact: PropTypes.string,
  email: PropTypes.string
}