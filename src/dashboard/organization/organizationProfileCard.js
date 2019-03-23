import React from "react"
import "Sass/card.scss"

const ProfileCard = ({dsoName, validationStatus, entityType, availableLocations}) => (
  <div className="card-container">
    <div className="item">
      <p className="label">Name of Entity</p>
      <p className="value">{dsoName}</p>
    </div>

    <div className="item">
      <p className="label">Validation Status</p>
      <p className="value">{validationStatus === "true" ? 'Validated' : 'Not Validated' }</p>
    </div>

    <div className="item">
      <p className="label">Type of Entity</p>
      <p className="value">{entityType}</p>
    </div>

    <div className="item">
      <p className="label">Locations present in</p>
      <p className="value">{availableLocations}</p>
    </div>
  </div>
)

export default ProfileCard