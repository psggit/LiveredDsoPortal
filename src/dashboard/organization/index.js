import React from "react"
import PageHeader from "Components/pageheader"
import Wrapper from "Components/contentWrapper"
import ProfileInfo from "./organizationProfileCard"
import AddressInfo from "./organizationAddressCard"
import Locations from "./locations"
import * as Api from "./../../api"

class Organization extends React.Component {
  constructor() {
    super()
    this.state = {
      activeTab: "company-profile",
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
    this.setState({loadingProfileDetails: true})
    Api.fetchCompanyProfileDetails({
      id: "SW123"
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
    const {activeTab, profileDetails, loadingProfileDetails} = this.state
    return(
      <div id="Organization">
        <PageHeader pageName="Organization" />
        <Wrapper>
          <div style={{display: 'flex', marginTop: '4px'}}>
            <ul className="nav">
              <li 
                onClick={() => this.setActiveTab("company-profile")} 
                className={`${activeTab === "company-profile" ? 'active' : ''}`}
              >
                <a>Company Profile</a>
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
            activeTab === "company-profile" &&
            !loadingProfileDetails &&
            <div style={{display: 'flex'}}>
              <ProfileInfo 
                dsoName={profileDetails.dso_name}
                validationStatus={profileDetails.is_validated}
                entityType=""
                availableLocations={profileDetails.locations}
              />
              <AddressInfo 
                headOffice={profileDetails.head_office.city}
                address={profileDetails.head_office.address}
                name={profileDetails.head_office.contact.name}
                contact={profileDetails.head_office.contact.phone}
                email={profileDetails.head_office.contact.email}
              />
            </div>
          }
          {
            activeTab === "locations" &&
            <div style={{padding: '20px 30px'}} >
              <Locations />
            </div>
          }
        </Wrapper>
      </div>
    )
  }
}

export default Organization