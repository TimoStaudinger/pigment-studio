import React from 'react'
import {createRoot} from 'react-dom/client'
import {HashRouter as Router, Route, Routes} from 'react-router-dom'
import {DndProvider} from 'react-dnd'
import {HTML5Backend} from 'react-dnd-html5-backend'

import App from './components/app/App'

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
          <Routes>
            <Route
              path="/:paletteId?/:colorIndex?/:shadeIndex?/:view?"
              element={<App />}
            />
          </Routes>
        </DndProvider>
      </Auth0Provider>
    </Router>
  )
}

createRoot(document.getElementById('root')!).render(<Root />)
