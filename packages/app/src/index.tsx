import React from 'react'
import ReactDOM from 'react-dom'
import Backend from 'react-dnd-html5-backend'
import {DndProvider} from 'react-dnd'
import {HashRouter as Router, Route} from 'react-router-dom'

import App from './App'
// import * as serviceWorker from './serviceWorker'

import './index.css'

ReactDOM.render(
  <Router>
    <DndProvider backend={Backend}>
      <Route path="/:shadeId?/:view?">
        <App />{' '}
      </Route>
    </DndProvider>
  </Router>,
  document.getElementById('root')
)

// serviceWorker.register()
