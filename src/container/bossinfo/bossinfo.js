import React, { Component } from 'react';
import { NavBar, InputItem, TextareaItem, Button } from 'antd-mobile';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import AvatarSelect from '../../component/avatarSelect/avatarSelect'
import { update } from '../../redux/user.redux'

@connect(
  state => state.user,
  { update }
)
class Bossinfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      desc: '',
      company: '',
      money: ''
    }
  }

  handleChange(key, value) {
    this.setState({
      [key]: value
    })
  }

  selectAvatar = (name) => {
    this.setState({
      avatar: name
    })
  }

  render() {
    const path = this.props.location.pathname;
    const redirect = this.props.redirectTo
    return (
      <div>
        {redirect && redirect !== path ? <Redirect to={this.props.redirectTo} /> : null}
        <NavBar mode="dark">
          BOSS完善信息页面
        </NavBar>
        <AvatarSelect selectAvatar={this.selectAvatar} />
        <InputItem onChange={v => this.handleChange('title', v)}>招聘职位</InputItem>
        <InputItem onChange={v => this.handleChange('company', v)}>公司名称</InputItem>
        <InputItem onChange={v => this.handleChange('money', v)}>职位薪酬</InputItem>
        <TextareaItem
          title="职位要求"
          onChange={v => this.handleChange('desc', v)}
          rows={3}
          autoHeight
        >

        </TextareaItem>
        <Button onClick={() => this.props.update(this.state)} type="primary">保存</Button>
      </div>
    )
  }
}
export default Bossinfo