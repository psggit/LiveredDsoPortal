import React from "react"
import PageHeader from "Components/pageheader"
import Wrapper from "Components/contentWrapper"
import ProfileInfo from "./organizationProfileCard"
import LiveredInfo from "./liveredDetailsCard"
import Locations from "./locations"
import * as Api from "./../../api"

class Organization extends React.Component {
  constructor() {
    super()
    this.state = {
      activeTab: "company-details",
      loadingProfileDetails: true,
      profileDetails: {}
    }

    this.setActiveTab = this.setActiveTab.bind(this)
    this.fetchCompanyProfileDetails = this.fetchCompanyProfileDetails.bind(this)
    this.successCallback = this.successCallback.bind(this)
  }

  componentDidMount() {
    this.fetchCompanyProfileDetails()
  }

  fetchCompanyProfileDetails() {
    this.setState({ loadingProfileDetails: true })
    Api.fetchCompanyProfileDetails({
      dso_id: localStorage.getItem("dso-id")
    }, this.successCallback)
  }

  successCallback(response) {
    this.setState({ profileDetails: response.dso, loadingProfileDetails: false })
  }

  /**
  * Used to highlight the active tab
  * @param {String} activeTabName - Indicates the active tab name
  */
  setActiveTab(activeTabName) {
    this.setState({ activeTab: activeTabName })
  }

  render() {
    const { activeTab, profileDetails, loadingProfileDetails } = this.state
    return (
      <div id="Organization">
        <PageHeader pageName="Organization" />
        <Wrapper>
          <div style={{ display: 'flex', marginTop: '4px' }}>
            <ul className="nav">
              <li
                onClick={() => this.setActiveTab("company-details")}
                className={`${activeTab === "company-details" ? 'active' : ''}`}
              >
                <a>Company Details</a>
              </li>
              <li
                onClick={() => this.setActiveTab("locations")}
                className={`${activeTab === "locations" ? 'active' : ''}`}
              >
                <a>Locations</a>
              </li>
            </ul>
          </div>
          {
            activeTab === "company-details" &&
            loadingProfileDetails &&
            <React.Fragment>
              <div className="card-container" style={{ textAlign: 'center' }}>
                Loading...
              </div>
            </React.Fragment>
          }
          {
            activeTab === "company-details" &&
            !loadingProfileDetails &&
            <React.Fragment>
              <div className="profile-details" style={{ borderBottom: '1px solid #dfe3e6' }}>
                <ProfileInfo
                  dsoName={profileDetails.dso_name}
                  entityType={profileDetails.entity_type}
                  headOffice={profileDetails.head_office.city}
                  address={profileDetails.head_office.address}
                  name={profileDetails.head_office.contact.name}
                  contact={profileDetails.head_office.contact.phone}
                  email={profileDetails.head_office.contact.email}
                />
              </div>
              <div className="livered-details">
                <LiveredInfo
                  licenseType={profileDetails.license_type}
                  licenseStatus={profileDetails.license_status}
                  licenseExpiry={profileDetails.license_expiry}
                  deliveryStatus={profileDetails.is_active}
                  stateServicable={profileDetails.state_servicable}
                />
              </div>
            </React.Fragment>
          }
          {
            activeTab === "locations" &&
            <div style={{ padding: '20px 30px' }} >
              <Locations />
            </div>
          }
        </Wrapper>
      </div>
    )
  }
}

export default Organization