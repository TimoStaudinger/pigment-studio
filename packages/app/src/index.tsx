import React from 'react'
import ReactDOM from 'react-dom'
import {HashRouter as Router, Route} from 'react-router-dom'
import {DndProvider} from 'react-dnd'
import {HTML5Backend} from 'react-dnd-html5-backend'

import App from './components/app/App'
// import * as serviceWorker from './serviceWorker'

import './index.css'
import {Auth0Provider} from './components/app/Auth0Provider'

const Root = () => {
  return (
    <Router>
      <Auth0Provider
        domain="pigment.auth0.com"
        client_id="fkzmeoPi1v7sPxFPTRAbTe5m4996MBAg"
      >
        <DndProvider backend={HTML5Backend}>
          <Route path="/:paletteId?/:colorIndex?/:shadeIndex?/:view?">
            <App />
          </Route>
        </DndProvider>
      </Auth0Provider>
    </Router>
  )
}

ReactDOM.render(<Root />, document.getElementById('root'))

// serviceWorker.register()
