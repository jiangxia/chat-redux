import React, { Component } from 'react'
import { connect } from 'react-redux';
import { NavBar } from 'antd-mobile'
import Boss from '../boss/boss'
import Genius from '../genius/genius'
import User from '../user/user'
import Msg from '../msg/msg'
import NavlistBar from '../navlink/navlink'

@connect(
  state => ({ user: state.user })
)
class Dashboard extends Component {
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
        <NavBar mode="dark">{navList.find(v => v.path === pathname).title}</NavBar>

        <NavlistBar data={navList} />
      </div>
    )
  }
}

export default Dashboard 