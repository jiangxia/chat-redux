import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Login from './container/login/login'
import Register from './container/register/register'
import AutoRouter from './component/autoRouter/autoRouter'
import Bossinfo from './container/bossinfo/bossinfo'
import Geniusinfo from './container/geniusinfo/geniusinfo'
import Dashboard from './component/dashboard/dashboard'
import Chat from './component/chat/chat'

export default class App extends React.Component {
  render() {
    return (
      <div>
        <AutoRouter></AutoRouter>
        <Switch>
          <Route path='/bossinfo' component={Bossinfo}></Route>
          <Route path='/geniusinfo' component={Geniusinfo}></Route>
          <Route path='/login' component={Login}></Route>
          <Route path='/register' component={Register}></Route>
          <Route path='/chat/:user' component={Chat}></Route>
          <Route component={Dashboard}></Route>
        </Switch>
      </div>
    )
  }
}
