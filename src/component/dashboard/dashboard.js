import React, { Component } from 'react'
import { connect } from 'react-redux';
import { NavBar } from 'antd-mobile'
import { Route, Redirect } from 'react-router-dom'
import QueueAnim from 'rc-queue-anim';
import Boss from '../boss/boss'
import Genius from '../genius/genius'
import User from '../user/user'
import Msg from '../msg/msg'
import NavlistBar from '../navlink/navlink'
import { getMsgList, recvMsg } from '../../redux/chat.redux'

@connect(
  state => ({ user: state.user, chat: state.chat }),
  { getMsgList, recvMsg }
)
class Dashboard extends Component {
  componentDidMount() {
    if (!this.props.chat.chatmsg.length) {
      this.props.getMsgList();
      this.props.recvMsg()
    }
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
    const page = navList.find(v => v.path === pathname);

    return page ? (
      <div>
        <NavBar className="fixd-header" mode="dark">{page.title}</NavBar>
        <div style={{ marginTop: 45 }}>
          <QueueAnim type='left' duration={1000}>
            <Route key={page.path} path={page.path} component={page.component}></Route>
          </QueueAnim>
        </div>

        <NavlistBar data={navList} />
      </div>
    ) : <Redirect to="/msg" />
  }
}

export default Dashboard 