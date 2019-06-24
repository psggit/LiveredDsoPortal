import React from "react"
import { locationsData } from "./../mock-data"
import DataTable from "Components/table/custom-table"
import Moment from "moment"
import * as Api from "./../../api"

class Locations extends React.Component {
  constructor() {
    super()

    this.locationsTableHeaders = [
      { title: "City/Town", icon: "" },
      { title: "State", icon: "" },
      { title: "Delivery Service Status", icon: "info", tooltipText: "Whether delivery services are enabled or disabled in a particular city" }
    ]

    this.state = {
      locationsData: [],
      loadingLocations: false
    }

    this.fetchLocations = this.fetchLocations.bind(this)
  }

  componentDidMount() {
    this.fetchLocations()
  }

  fetchLocations() {
    this.setState({ loadingLocations: true })
    Api.fetchLocations({})
      .then((response) => {
        this.setState({ locationsData: response.locations, loadingLocations: false })
      })
      .catch((err) => {
        console.log("Error in fetching locations", err)
      })
  }

  render() {
    const { locationsData, loadingLocations } = this.state
    return (
      <div>
        <DataTable
          headings={this.locationsTableHeaders}
          loadingData={loadingLocations}
        >
          {
            locationsData.length > 0 &&
            locationsData.map((item, i) => {
              return (
                <tr key={i}>
                  <td>{item.city}</td>
                  <td>{item.state}</td>
                  <td>{item.service_status ? 'Enabled' : 'Disabled'}</td>
                </tr>
              )
            })
          }
        </DataTable>
      </div>
    )
  }
}

export default Locations