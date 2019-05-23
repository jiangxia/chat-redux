import React, { Component } from 'react'
import Logo from '../../component/logo/logo'
import { List, Radio, Button, WhiteSpace, InputItem } from 'antd-mobile'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'
import { register } from '../../redux/user.redux'

@connect(
  state => state.user,
  { register }
)
class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      pwd: '',
      repeatpwd: '',
      type: 'genius',
      msg: ''
    }
  }
  handleChange(key, value) {
    this.setState({
      [key]: value
    })
  }
  handleRegister = () => {
    this.props.register(this.state)
  }
  render() {
    const RadioItem = Radio.RadioItem;
    return (
      <div>
        {this.props.redirectTo ? <Redirect to={this.props.redirectTo}/>:null}
        <Logo></Logo>
        {this.props.msg !== '' ? <p className="error_msg">{this.props.msg}</p> : null}
        <List>
          <WhiteSpace></WhiteSpace>
          <InputItem onChange={v => this.handleChange('user', v)}>用户名</InputItem>
          <WhiteSpace></WhiteSpace>
          <InputItem type="password" onChange={v => this.handleChange('pwd', v)}>密码</InputItem>
          <WhiteSpace></WhiteSpace>
          <InputItem type="password" onChange={v => this.handleChange('repeatpwd', v)}>确认密码</InputItem>
          <WhiteSpace></WhiteSpace>
          <RadioItem checked={this.state.type === 'genius'} onChange={() => this.handleChange('type', 'genius')}>牛人</RadioItem>
          <RadioItem checked={this.state.type === 'boss'} onChange={() => this.handleChange('type', 'boss')}>Boss</RadioItem>
        </List>
        <WhiteSpace></WhiteSpace>
        <Button type="primary" onClick={this.handleRegister}>注册</Button>
      </div>
    )
  }
}

export default Register