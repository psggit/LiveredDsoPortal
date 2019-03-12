import React from 'react'

const Layout = ({ title, children }) => (
  <div
    style={{
    marginLeft: '250px',
    //marginTop: '62px',
    padding: '70px',
    width: 'calc(100% - 250px)'
  }}
  >
    <p
      style={{
      color: '#152935',
      fontSize: '22px',
      //fontWeight: '600',
      marginBottom: '30px',
      //borderBottom: '1px solid #dfdfdf'
    }}
    >
      { title }
    </p>
    { children }
  </div>
)

export default Layout
