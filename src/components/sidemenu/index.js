import React from 'react'
import './sidemenu.scss'
import Icon from "./../icon"

class SideMenu extends React.Component {
  checkActiveClass(value) {
    if (this.props.currentRoute === value) {
      return 'active'
    }
    return ''
  }

  handleChangeRoute(e, currentRoute) {
    e.preventDefault()
    this.props.history.push(`/home/${currentRoute}`)
  }

  render() {
    const { menuItems, currentRoute } = this.props
    return (
      <div id="sidemenu">
        <div className="side-menu">
          {
            menuItems.map((item, i) => (
              <div key={i} className={`side-menu__item ${this.checkActiveClass(item.value)}`}>
                {
                  item.title &&
                  <div className="categories">{item.title}</div>
                }
                {
                  <React.Fragment>
                    <a
                      href={`/home/${item.value}`}
                      onClick={(e) => { this.handleChangeRoute(e, item.value) }}
                    >
                      <span>
                        <Icon name={item.icon} />
                      </span>
                      { item.label }
                      <div className="highlight"></div>
                    </a>
                   
                  </React.Fragment>
                }
              </div>
            ))
          }
        </div>
        <div className="footer">
          <div className="icon-section">
            <span>
              <Icon name="cloudIcon" />
            </span>
          </div>
          <div className="text-section">
            <p>Need help?</p>
            <p className="note">Get in touch with us</p>
          </div>
        </div>
      </div>
    )
  }
}

export default SideMenu
