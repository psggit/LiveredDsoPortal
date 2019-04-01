import React from "react"
import "Sass/card.scss"
import PropTypes from "prop-types"

const LiveredDetailsCard = ({isValidated, category}) => (
  <div className="card-container">
    <h3>LiveRed Details</h3>
    <div className="item">
      <p className="label">Delivery Validation Status</p>
      <p className="value">{isValidated === "true" ? "Validated" : "Not Validated"}</p>
    </div>

    <div className="item">
      <p className="label">Category</p>
      <p className="value">{category}</p>
    </div>
  </div>
)

export default LiveredDetailsCard

LiveredDetailsCard.defaultProps = {
  isValidated: undefined,
  category: undefined
}

LiveredDetailsCard.propTypes = {
  isValidated: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
}