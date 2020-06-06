import React from 'react'
import ReactDOM from 'react-dom'
import {HashRouter as Router, Route} from 'react-router-dom'
import {DndProvider} from 'react-dnd'
import {HTML5Backend} from 'react-dnd-html5-backend'

import App from './components/app/App'
// import * as serviceWorker from './serviceWorker'

import './index.css'

ReactDOM.render(
  <Router>
    <DndProvider backend={HTML5Backend}>
      <Route path="/:paletteId?/:colorIndex?/:shadeIndex?/:view?">
        <App />
      </Route>
    </DndProvider>
  </Router>,
  document.getElementById('root')
)

// serviceWorker.register()
