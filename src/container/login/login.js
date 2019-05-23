import React, { Component } from 'react'
import Logo from '../../component/logo/logo';
import { List, Button, WingBlank, WhiteSpace, InputItem } from 'antd-mobile'

export default class Login extends Component {
  register = () => {
    this.props.history.push('/register');
  }

  render() {
    return (
      <div>
        <Logo></Logo>
        <List>
          <InputItem>用户</InputItem>
          <WhiteSpace />
          <InputItem>密码</InputItem>
          <WhiteSpace />
        </List>
        <WingBlank>
          <Button type="primary">登录</Button>
          <WhiteSpace />
          <Button type="primary" onClick={this.register}>注册</Button>
        </WingBlank>
      </div>
    )
  }
}
