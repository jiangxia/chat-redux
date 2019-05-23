import React from 'react'
import ReactDom from 'react-dom'
import { createStore, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import reducers from './reducer'
import './config'
import './index.css'
import Login from './container/login/login'
import Register from './container/register/register'
import AutoRouter from './component/autoRouter/autoRouter'
import Bossinfo from './container/bossinfo/bossinfo'
import Geniusinfo from './container/geniusinfo/geniusinfo'
import Dashboard from './component/dashboard/dashboard'

const store = createStore(reducers, compose(
  applyMiddleware(thunk),
  window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
))
ReactDom.render(
  (<Provider store={store}>
    <BrowserRouter>
      <div>
        <AutoRouter></AutoRouter>
        <Switch>
          <Route path='/bossinfo' component={Bossinfo}></Route>
          <Route path='/geniusinfo' component={Geniusinfo}></Route>
          <Route path='/login' component={Login}></Route>
          <Route path='/register' component={Register}></Route>
          <Route component={Dashboard}></Route>
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>),
  document.getElementById('root')
)