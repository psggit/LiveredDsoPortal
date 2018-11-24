import React from 'react'
import { render } from 'react-dom'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import Login from './login'
import Dashboard from './dashboard'

class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={Login} />
          <Route path="/home" component={Dashboard} />
        </div>
      </Router>
    )
  }
}

render(<App />, document.getElementById('root'))

export default App
