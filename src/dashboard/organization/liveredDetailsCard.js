import React from "react"
import "Sass/card.scss"
import PropTypes from "prop-types"
import Moment from "moment"
import Label from "Components/label"

const LiveredDetailsCard = ({ licenseType, licenseStatus, licenseExpiry, deliveryStatus, stateServicable }) => (
  <div className="card-container">
    <h3>LiveRed Details</h3>
    <div className="row">
      <div className="column">
        <div className="item">
          <Label
            icon="info"
            tooltipText="Type of License for a delivery operator"
          >
            License Type
          </Label>
          <p className="value">{licenseType}</p>
        </div>

        <div className="item">
          <Label
            icon="info"
            tooltipText="Current status of delivery operator’s license to delivery liquor"
          >
            License Status
          </Label>
          <p className="value">{licenseStatus ? "Active" : "Inactive"}</p>
        </div>
        <div className="item">
          <Label
            icon="info"
            tooltipText="Expiry date of delivery operator’s license to delivery liquor"
          >
            License Expiry
          </Label>
          <p className="value">{Moment(licenseExpiry).format("DD-MM-YYYY")}</p>
        </div>
      </div>
      <div className="column">
        <div className="item">
          <Label
            icon="info"
            tooltipText="Current status of delivery operations for a delivery operator. Exceptions prevail for specific cities based on special restrictions"
          >
            Delivery Status
          </Label>
          <p className="value">{deliveryStatus ? "Validated" : "Not Validated"}</p>
        </div>
        <div className="item">
          <Label
            icon="info"
            tooltipText="States where delivery operations are serviceable"
          >
            States Servicable
          </Label>
          <p className="value">{stateServicable.join(", ")}</p>
        </div>
      </div>
    </div>
  </div>
)

export default LiveredDetailsCard

LiveredDetailsCard.defaultProps = {
  licenseType: undefined,
  licenseStatus: undefined,
  licenseExpiry: undefined,
  deliveryStatus: undefined,
  stateServicable: undefined
}

LiveredDetailsCard.propTypes = {
  licenseType: PropTypes.string.isRequired,
  licenseStatus: PropTypes.bool.isRequired,
  licenseExpiry: PropTypes.string.isRequired,
  deliveryStatus: PropTypes.bool.isRequired,
  stateServicable: PropTypes.array.isRequired
}