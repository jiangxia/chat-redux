import React, { Component } from 'react'
import Logo from '../../component/logo/logo';
import { List, Button, WingBlank, WhiteSpace, InputItem } from 'antd-mobile'
import { Redirect } from 'react-router-dom'
import { login } from '../../redux/user.redux';
import { connect } from 'react-redux';
import HocForm from '../../component/HocForm/HocForm'
@connect(
  state => state.user,
  { login }
)
@HocForm
class Login extends Component {
  register = () => {
    this.props.history.push('/register');
  }

  handleLogin = () => {
    this.props.login(this.props.state);
  }

  render() {
    return (
      <div>
        {this.props.redirectTo && this.props.redirectTo !== '/login' ? <Redirect to={this.props.redirectTo} /> : null}
        <Logo></Logo>
        {this.props.msg !== '' ? <p className="error_msg">{this.props.msg}</p> : null}
        <List>
          <InputItem onChange={v => this.props.handleChange('user', v)}>用户</InputItem>
          <WhiteSpace />
          <InputItem type="password" onChange={v => this.props.handleChange('pwd', v)}>密码</InputItem>
          <WhiteSpace />
        </List>
        <WingBlank>
          <Button type="primary" onClick={this.handleLogin}>登录</Button>
          <WhiteSpace />
          <Button type="primary" onClick={this.register}>注册</Button>
        </WingBlank>
      </div>
    )
  }
}

export default Login