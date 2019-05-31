import React, { Component } from 'react'
import Logo from '../../component/logo/logo'
import { List, Radio, Button, WhiteSpace, InputItem } from 'antd-mobile'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'
import { register } from '../../redux/user.redux'
import HocForm from '../../component/HocForm/HocForm'

@connect(
  state => state.user,
  { register }
)
@HocForm
class Register extends Component {
  handleRegister = () => {
    this.props.register(this.props.state)
  }
  componentDidMount() {
    this.props.handleChange('type', 'genius')
  }
  render() {
    const RadioItem = Radio.RadioItem;
    
    return (
      <div>
        {this.props.redirectTo && this.props.redirectTo !== '/login' ? <Redirect to={this.props.redirectTo} /> : null}
        <Logo></Logo>
        {this.props.msg !== '' ? <p className="error_msg">{this.props.msg}</p> : null}
        <List>
          <WhiteSpace></WhiteSpace>
          <InputItem onChange={v => this.props.handleChange('user', v)}>用户名</InputItem>
          <WhiteSpace></WhiteSpace>
          <InputItem type="password" onChange={v => this.props.handleChange('pwd', v)}>密码</InputItem>
          <WhiteSpace></WhiteSpace>
          <InputItem type="password" onChange={v => this.props.handleChange('repeatpwd', v)}>确认密码</InputItem>
          <WhiteSpace></WhiteSpace>
          <RadioItem checked={this.props.state.type === 'genius'} onChange={() => this.props.handleChange('type', 'genius')}>牛人</RadioItem>
          <RadioItem checked={this.props.state.type === 'boss'} onChange={() => this.props.handleChange('type', 'boss')}>Boss</RadioItem>
        </List>
        <WhiteSpace></WhiteSpace>
        <Button type="primary" onClick={this.handleRegister}>注册</Button>
      </div>
    )
  }
}

export default Register