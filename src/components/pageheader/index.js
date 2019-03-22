import React from 'react'
import Icon from './../icon'

const PageHeader = ({ pageName }) => (
  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '26px' }}>
    {/* <Icon name="box" /> */}
    <span style={{ fontSize: '28px', color: '#152935' }}>{ pageName }</span> 
  </div>
)

export default PageHeader