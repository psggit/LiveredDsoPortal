import React from "react"
import PageHeader from "Components/pageheader"
import Wrapper from "Components/contentWrapper"
import ProfileInfo from "./organizationProfileCard"
import AddressInfo from "./organizationAddressCard"
import Locations from "./locations"

class Organization extends React.Component {
  constructor() {
    super()
    this.state = {
      activeTab: "company-profile"
    }
  
    this.setActiveTab = this.setActiveTab.bind(this)
  }

  /**
  * Used to highlight the active tab
  * @param {String} activeTabName - Indicates the active tab name
  */
  setActiveTab(activeTabName) {
    this.setState({ activeTab: activeTabName })
  }

  render() {
    const {activeTab} = this.state
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
            <div style={{display: 'flex'}}>
              <ProfileInfo 
                dsoName="Swiggy"
                validationStatus="Validated"
                entityType="Private Limited"
                availableLocations="Chennai, Mumbai, Hyderabad, Benguluru, Kolkata, Pune, Agra"
              />
              <AddressInfo 
                headOffice="Bengaluru"
                address="No 5, Sri Sagar St, Indira Nagar, Bengaluru 560094"
                name="Saurabh"
                contact="9840677625"
                email="saurabh@gmail.com"
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