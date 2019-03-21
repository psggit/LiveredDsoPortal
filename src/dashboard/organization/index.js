import React from "react"
import PageHeader from "Components/pageheader"
import Wrapper from "Components/contentWrapper"

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
                <a href="/home/company-profile">Company Profile</a>
              </li>
              <li
                onClick={() => this.setActiveTab("locations")}
                className={`${activeTab === "locations" ? 'active' : ''}`}
              >
                <a href="/home/locations">Locations</a>
              </li>
            </ul>
          </div>
        </Wrapper>
      </div>
    )
  }
}

export default Organization