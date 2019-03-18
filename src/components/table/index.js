import React from "react"
import "./table.scss"

class Table extends React.Component {

  constructor() {
    super()
    this.renderHeadingRow = this.renderHeadingRow.bind(this)
    this.renderRow = this.renderRow.bind(this)
  }

  renderHeadingRow = (_cell, cellIndex) => {
    const { headings } = this.props

    return (
      <th>
        {headings[cellIndex]}
      </th>
    )
  }

  renderRow = (_row, rowIndex) => {
    const { rows } = this.props

    return (
      <tr 
        key={`row-${rowIndex}`} 
        onClick={this.props.rowClick ? this.props.rowClick : () => {}}
        className={`${this.props.rowClick ? 'clickable' : undefined}`}
      >
        {
          Object.keys(rows[rowIndex]).map((key) => rows[rowIndex][key]).map((item, i) => {
            return (
              <td>
                {item}
              </td>
            )
          })
        }
      </tr>
    )
  }
  render() {
    const {headings, rows} = this.props;
    return (
      <div className="table-wrapper">
        <table className={`${this.props.className ? 'logs' : ''}`}>
          <thead>
            <tr key="heading">
              {headings.map(this.renderHeadingRow)}
            </tr>
          </thead>
          <tbody>
            {rows.map(this.renderRow)}
          </tbody>
        </table>
      </div>
    )
  }
}

export default Table