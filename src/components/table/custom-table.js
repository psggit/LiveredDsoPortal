import React from "react"
import Loader from "Components/loader"
import "./table.scss"
import Icon from "./../icon"

class CustomTable extends React.Component {
  constructor() {
    super()
    this.renderHeadingRow = this.renderHeadingRow.bind(this);
  }

  renderHeadingRow = (item, i) => {
    return (
      <th key={i}>
        {item.title}
        {
          item.icon &&
          <span className="info"  style={{ position: "relative", marginLeft: "12px", verticalAlign: "middle"}}>
            <Icon name={item.icon} /> 
            <span className="tooltip-text">
              {item.tooltipText}
            </span>
          </span>
        }
      </th>
    )
  }

  render() {
    const {headings, rows} = this.props;
    return (
      <div className="table-wrapper">
        <table className={`${this.props.className ? 'logs' : ''}`}>
          <thead>
            <tr>
              {
                headings.map((item,i) => {
                  return this.renderHeadingRow(item, i)
                })
              }
            </tr>
          </thead>
          <tbody>
            {this.props.children}
            {/* {
              this.props.loadingData &&
              <tr>
                <td colSpan={this.props.headings.length}>
                  <Loader />
                </td>
              </tr>
            } */}
            {
              !this.props.loadingData &&
              this.props.children.length === 0 && (
                <tr>
                  <td style={{ textAlign: "center" }} colSpan={this.props.headings.length}>
                    No orders found
                  </td>
                </tr>
              )
            }
          </tbody>
        </table>
      </div>
    )
  }
}

export default CustomTable

