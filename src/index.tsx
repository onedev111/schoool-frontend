import React from 'react'
import ReactDOM from 'react-dom'
import { Router } from 'react-router-dom'
import history from 'Shared/history'
import Routes from 'Router'
import './styles.css'
import './style.css'

ReactDOM.render(
  <React.StrictMode>
    <Router history={history}>
      <Routes />
    </Router>
  </React.StrictMode>,
  document.getElementById('root'),
)
