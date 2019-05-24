import React, { Component } from 'react'
import Logo from '../../component/logo/logo';
import { List, Button, WingBlank, WhiteSpace, InputItem } from 'antd-mobile'
import { Redirect } from 'react-router-dom'
import { login } from '../../redux/user.redux';
import { connect } from 'react-redux';

@connect(
  state => state.user,
  { login }
)
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      pwd: ''
    }
  }

  register = () => {
    this.props.history.push('/register');
  }

  handleChange(key, value) {
    this.setState({
      [key]: value
    })
  }

  handleLogin = () => {
    this.props.login(this.state);
  }

  render() {
    return (
      <div>
        {this.props.redirectTo && this.props.redirectTo !== '/login' ? <Redirect to={this.props.redirectTo} /> : null}
        <Logo></Logo>
        {this.props.msg !== '' ? <p className="error_msg">{this.props.msg}</p> : null}
        <List>
          <InputItem onChange={v => this.handleChange('user', v)}>用户</InputItem>
          <WhiteSpace />
          <InputItem type="password" onChange={v => this.handleChange('pwd', v)}>密码</InputItem>
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