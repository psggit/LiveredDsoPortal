import React, { useState, useEffect } from 'react'
import './search.scss'
import Icon from './../icon'

const Search = (props) => {
  const handleSearch = (e) => {
    if (e.keyCode === 13) {
      props.handleSearch()
    }
  }

  return (
    <div className="search--box">
      <span
        className="search-icon search"
        onClick={(e) => handleSearch(e)}
      >
        <Icon name="search" />
      </span>
      <input
        placeholder={props.placeholder}
        value={props.searchText}
        onChange={(e) => props.setSearchText(e.target.value)}
        onKeyDown={(e) => handleSearch(e)}
      />
      {
        props.searchText ?
          <span className="search-icon cross" onClick={() => props.clearSearch()}>
            <Icon name="cross" />
          </span> :
          ''
      }
    </div>
  )
}

export default Search