import React from 'react'
import ReactDom from 'react-dom'
import { createStore, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import reducers from './reducer'
import './config'
import './index.css'
import App from './App'

const store = createStore(reducers, compose(
  applyMiddleware(thunk),
  window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
))
ReactDom.render(
  (<Provider store={store}>
    <BrowserRouter>
      <App></App>
    </BrowserRouter>
  </Provider>),
  document.getElementById('root')
)