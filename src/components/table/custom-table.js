import React from "react"
import Loader from "Components/loader"
import "./table.scss"

class CustomTable extends React.Component {
  constructor() {
    super()
    this.renderHeadingRow = this.renderHeadingRow.bind(this);
    //this.renderRow = this.renderRow.bind(this);
  }

  renderHeadingRow = (_cell, cellIndex) => {
    const { headings } = this.props

    return (
      <th key={cellIndex}>
        {headings[cellIndex]}
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
              {headings.map(this.renderHeadingRow)}
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

