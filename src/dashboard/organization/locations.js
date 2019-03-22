import React from "react"
import {locationsData} from "./../mock-data"
import DataTable from "Components/table/custom-table"
import Moment from "moment"

class Locations extends React.Component {
  constructor() {
    super()

    this.locationsTableHeaders = [
      // 'City/Town',
      // 'State',
      // 'Service Started On',
      // 'Delivery Service Status'
      {title: "City/Town", icon: ""},
      {title: "State", icon: ""}, 
      {title: "Service Started On", icon: "info"},
      {title: "Delivery Service Status", icon: "info"}
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
                <td>{Moment(item.started_on).format("DD/MM/YYYY")}</td>
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