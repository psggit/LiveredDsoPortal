import React from 'react'
import Icon from './../icon'
import PropTypes from "prop-types"

const PageHeader = ({ pageName }) => (
  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '26px' }}>
    {/* <Icon name="box" /> */}
    <span style={{ fontSize: '28px', color: '#152935' }}>{ pageName }</span> 
  </div>
)

export default PageHeader

PageHeader.defaultProps = {
  pageName: undefined
}

PageHeader.propTypes = {
  pageName: PropTypes.string.isRequired
}