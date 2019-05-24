import React, { Component } from 'react'
import { connect } from 'react-redux';
import { NavBar } from 'antd-mobile'
import { Switch, Route } from 'react-router-dom'
import Boss from '../boss/boss'
import Genius from '../genius/genius'
import User from '../user/user'
import Msg from '../msg/msg'
import NavlistBar from '../navlink/navlink'
import { getMsgList, recvMsg } from '../../redux/chat.redux'

@connect(
  state => ({ user: state.user }),
  { getMsgList, recvMsg }
)
class Dashboard extends Component {
  componentDidMount() {
    this.props.getMsgList()
    this.props.recvMsg()
  }

  render() {
    const user = this.props.user;
    const { pathname } = this.props.location;

    const navList = [
      {
        path: '/boss',
        text: '牛人',
        icon: 'boss',
        title: '牛人列表',
        component: Boss,
        hide: user.type === 'genius'
      },
      {
        path: '/genius',
        text: 'boss',
        icon: 'job',
        title: 'BOSS列表',
        component: Genius,
        hide: user.type === 'boss'
      },
      {
        path: '/msg',
        text: '消息',
        icon: 'msg',
        title: '消息列表',
        component: Msg
      },
      {
        path: '/me',
        text: '我',
        icon: 'user',
        title: '个人中心',
        component: User
      }
    ]

    return (
      <div>
        <NavBar className="fixd-header" mode="dark">{navList.find(v => v.path === pathname).title}</NavBar>
        <div style={{ marginTop: 45 }}>
          <Switch>
            {navList.map(v => (
              <Route key={v.path} path={v.path} component={v.component}></Route>
            ))}
          </Switch>
        </div>

        <NavlistBar data={navList} />
      </div>
    )
  }
}

export default Dashboard 