import React from 'react'
import ReactDOM from "react-dom"
import { createBrowserHistory as createHistory } from 'history'
import { Route, Switch } from 'react-router-dom'
import { Router } from 'react-router'
import Header from 'Components/header'
import SideMenu from 'Components/sidemenu'
import 'Sass/app.scss'
import Layout from 'Components/layout'
import { menuItems } from './const/nav-items'
//import Support from './dashboard/supportWithForm'
import Support from './dashboard/supportWithoutForm'
import Login from './login'
import CreditManagement from "./dashboard/creditLog"
import AddCredits from "./dashboard/addCredits"
import Reports from "./dashboard/reports"
import Organization from "./dashboard/organization"
import Account from "./dashboard/Account"
import UserLog from "./dashboard/userLog"
import Api from "./dashboard/api"

const history = createHistory()

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      currentRoute: location.pathname.split('/')[2] || '',
      key: 0,
      isLoggedIn: true
    }
    this.checkUserLoggedIn = this.checkUserLoggedIn.bind(this)
  }

  componentDidMount() {
    history.listen((loction) => {
      const newRoute = location.pathname.split('/')[2]
      const { key } = this.state
      this.setState({ key: key + 1, currentRoute: newRoute })
    })
  }

  checkUserLoggedIn() {
    const fetchOptions = {
      method: 'get',
      credentials: 'include',
      mode: 'cors',
      'x-hasura-role': 'user'
    }

    fetch(`${Api.authUrl}/user/account/info`, fetchOptions)
      .then((response) => {
        if (response.status !== 200) {
          console.log(`Looks like there was a problem. Status Code: ${response.status}`)
          if (location.pathname !== '/login') {
            location.href = '/login'
          }
          return
        }
        response.json().then((data) => {
          if (!location.pathname.includes('home') && !location.pathname.includes('support')) {
            location.href = '/home/live-ottp'
          }
        })
      })
      .catch((err) => {
        console.log('Fetch Error :-S', err)
        if (location.pathname !== '/login') {
          location.href = '/login'
        }
      })
  }

  render() {
    const { isLoggedIn } = this.state

    return (
      <Router history={history}>
        <div>

          {/* <Route exact path="/" component={Login} /> */}
          <Route exact path="/login" component={Login} />
          {
            location.pathname.includes("home") &&
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
              <Header isLoggedIn={isLoggedIn} />
              <div>
                {
                  this.state.isLoggedIn &&
                  <SideMenu
                    history={history}
                    menuItems={menuItems}
                    currentRoute={this.state.currentRoute}
                  />
                }
                <Layout isLoggedIn={isLoggedIn}>
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

                    {/* {
                      this.state.isLoggedIn &&
                      <Route 
                        exact 
                        path="/home/support" 
                        render={props => <SupportWithForm {...props} isLoggedIn={this.state.isLoggedIn} />}
                      />
                    } */}


                    <Route
                      exact
                      path="/home/support"
                      render={props => <Support isLoggedIn={isLoggedIn} {...props} />}
                    />

                    <Route
                      exact
                      path="/home/user-log"
                      render={props => <UserLog {...props} />}
                    />

                    <Route
                      exact
                      path="/home/credits"
                      render={props => <CreditManagement {...props} />}
                    />

                    <Route
                      exact
                      path="/home/organization"
                      render={props => <Organization {...props} />}
                    />

                    <Route
                      exact
                      path="/home/reports"
                      render={props => <Reports {...props} />}
                    />

                    <Route
                      exact
                      path="/home/api"
                      render={props => <Api {...props} />}
                    />
                  </Switch>
                </Layout>
              </div>
            </div>
          }
        </div>
      </Router>
    )
  }
}
ReactDOM.render(<App />, document.getElementById('root'))

export default App
