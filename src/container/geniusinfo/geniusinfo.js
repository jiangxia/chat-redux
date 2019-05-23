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
class Geniusinfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      desc: ''
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
          牛人完善信息页面
        </NavBar>
        <AvatarSelect selectAvatar={this.selectAvatar} />
        <InputItem onChange={v => this.handleChange('title', v)}>求职岗位</InputItem>
        <TextareaItem
          title="个人简介"
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
export default Geniusinfo