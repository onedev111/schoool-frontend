import React from 'react'
import ReactDOM from 'react-dom'
import { Router } from 'react-router-dom'
import history from 'utils/history'
import Routes from 'App/Router'
import './tailwind.css'
import './style.css'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import smoothscroll from 'smoothscroll-polyfill'
import DragNDropWrapper from 'Shared/DragNDropWrapper'
import { QueryClientProvider } from 'react-query'
import { queryClient } from 'utils/queryClient'

dayjs.extend(utc)
smoothscroll.polyfill()

ReactDOM.render(
  <React.StrictMode>
    <DragNDropWrapper>
      <Router history={history}>
        <QueryClientProvider client={queryClient}>
          <Routes />
        </QueryClientProvider>
      </Router>
    </DragNDropWrapper>
  </React.StrictMode>,
  document.getElementById('root'),
)
