import React, { Component } from 'react'
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import { loadData } from '../../redux/user.redux'
@withRouter
@connect(
  null,
  { loadData }
)
class AutoRouter extends Component {
  componentDidMount() {
    const publicList = ['/login', '/register'];
    const pathname = this.props.location.pathname
    if (publicList.indexOf(pathname) > -1) {
      return null;
    }
    // 获取用户信息
    axios.get('/user/info').then((res) => {

      if (res.status === 200) {
        if (res.data.code === 0) {
          this.props.loadData(res.data.data)
        } else {
          this.props.history.push('/login')
        }
      }
    })
    // 是否登录
    // 现在的URL，如果现在是在login，则不需要跳转
    // 用户的类型，牛人跟boss跳转的页面不同
    // 用户是否完善信息
  }
  render() {
    return null;
  }
}

export default AutoRouter;