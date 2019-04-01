import React from "react"
import {locationsData} from "./../mock-data"
import DataTable from "Components/table/custom-table"
import Moment from "moment"

class Locations extends React.Component {
  constructor() {
    super()

    this.locationsTableHeaders = [
      {title: "City/Town", icon: ""},
      {title: "State", icon: ""}, 
      // {title: "Service Started On", icon: "info", tooltipText: "Service started on date when delivery services began in a particular city"},
      {title: "Delivery Service Status", icon: "info", tooltipText: "Whether delivery services are enabled or disabled in a particular city"}
    ]
  }

  render() {
    return(
      <div>
        <DataTable
          headings={this.locationsTableHeaders}
          loadingData={false}
          //className="logs"
        >
        {
          locationsData.length &&
          locationsData.map((item, i) => {
            return (
              <tr key={i}>
                <td>{item.city}</td>
                {/* <td>{Moment(item.started_on).format("DD/MM/YYYY")}</td> */}
                <td>{item.state}</td>
                <td>{item.service_status}</td>
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