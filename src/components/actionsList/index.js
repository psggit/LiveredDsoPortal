import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import './action-list.scss'

function getPosition(target) {
  const posObj = target.getBoundingClientRect()
  const containerScrollPos = window.pageYOffset|| document.documentElement.scrollTop || document.body.scrollTop || 0
  return {
    top: posObj.top + containerScrollPos + 10,
    left: posObj.left - 130
  }
}

function unmountActionsMenu(e) {
  if (e.target.parentNode.getAttribute('name') !== 'settings') {
    unmountComponentAtNode(document.querySelector('.action-menu'))
  }
}

class ActionMenu extends React.Component {
  componentDidMount() {
    document.addEventListener('click', unmountActionsMenu)
  }

  componentWillUnmount() {
    document.removeEventListener('click', unmountActionsMenu)
  }

  render() {
    return (
      <ul
        className='action-menu'
        style={{
          position: 'fixed',
          zIndex: '1',
          backgroundColor: '#fff',
          width: '140px',
          boxShadow: '0 1px 8px 2px #dfdfdf',
          borderRadius: '2px',
          top: getPosition(this.props.target).top,
          left: getPosition(this.props.target).left
        }}>
        {
          this.props.items.map((item, i) => (
            <li key={i} onClick={item.onClick} className='action-menu__item'>{item.label}</li>
          ))
        }
      </ul>
    )
  }
}

function openActionMenu(target, items) {
  const className = "action-menu"
  const el = document.querySelector(`.${className}`)

  if (el) {
    el.parentNode.removeChild(el)
  }

  const container = document.createElement("div")
  container.setAttribute("class", `${className}`)
  document.body.appendChild(container)
  render(<ActionMenu target={target} items={items} />, container)
}

export default openActionMenu
