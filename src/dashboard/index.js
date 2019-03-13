import React from 'react'
import SideMenu from 'Components/sidemenu'
import createHistory from 'history/createBrowserHistory'
import { Route, Switch } from 'react-router-dom'
import { Router } from 'react-router'
import Account from './Account'
import unmountNotify from 'Components/notify/utils'
import Header from 'Components/header';
import { menuItems } from './../const/nav-items'
import 'Sass/app.scss'

const history = createHistory()

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      currentRoute: location.pathname.split('/')[2] || '',
      key: 0,
      isLoggedIn: false
    }
  }

  componentDidMount() {
    history.listen((loction) => {
      console.log("history")
      const newRoute = location.pathname.split('/')[2]
      const { key } = this.state
      this.setState({ key: key + 1, currentRoute: newRoute })
    })
  }

  render() {
    const { isLoggedIn } = this.state
    return (
      <div
        style={{
          backgroundColor: '#fbfbfb',
          width: '100%',
          //maxWidth: '1980px',
          margin: '0 auto',
          height: '100vh',
          overflow: 'auto'
        }}
      >
        {/* <Navbar /> */}
        <Header isLoggedIn={isLoggedIn} />
        <div style={{ display: 'flex' }}>
          <SideMenu
            history={history}
            menuItems={menuItems}
            currentRoute={this.state.currentRoute}
          />
          <Router history={history}>
            <Switch>
              <Route
                exact
                path="/home/account"
                render={
                  props => (
                    <Account {...props} />
                  )
                }
              />

              {/* <Route
                exact
                path="/home/live-ottp"
                render={
                  props => (
                    <LiveOttp {...props} />
                  )
                }
              />

              <Route
                exact
                path="/home/history-ottp"
                render={
                  props => (
                    <HistoryOttp {...props} />
                  )
                }
              /> */}
            </Switch>
          </Router>
        </div>
      </div>
    )
  }
}

export default App
