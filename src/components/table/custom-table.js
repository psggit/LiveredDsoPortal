import React from "react"
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
      <th className="Cell Cell-header">
        {headings[cellIndex]}
      </th>
    )
  }

  // renderRow = (_row, rowIndex) => {
  //   const { rows } = this.props

  //   return (
  //     <tr key={`row-${rowIndex}`}>
  //       {
  //         Object.keys(rows[rowIndex]).map((key) => rows[rowIndex][key]).map((item, i) => {
  //           return (
  //             <Cell
  //               key={i}
  //               content={item}
  //             />
  //           )
  //         })
  //       }
  //     </tr>
  //   )
  // }

  render() {
    const {headings, rows} = this.props;
    return (
      <table className="Table">
        <thead>
          <tr key="heading">
            {headings.map(this.renderHeadingRow)}
          </tr>
        </thead>
        <tbody>
          {this.props.children}
        </tbody>
      </table>
    )
  }
}

export default CustomTable

