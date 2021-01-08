import React from 'react'
import ReactDOM from 'react-dom'
import { Router } from 'react-router-dom'
import history from 'utils/history'
import Routes from 'Router'
import './styles.css'
import './style.css'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import smoothscroll from 'smoothscroll-polyfill'
import DragNDropWrapper from 'Shared/DragNDropWrapper'

dayjs.extend(utc)
smoothscroll.polyfill()

ReactDOM.render(
  <React.StrictMode>
    <DragNDropWrapper>
      <Router history={history}>
        <Routes />
      </Router>
    </DragNDropWrapper>
  </React.StrictMode>,
  document.getElementById('root'),
)
