import React, { Component } from 'react'
import { Grid, List } from 'antd-mobile';
import propTypes from 'prop-types'

class AvatarSelect extends Component {
  static propTypes = {
    selectAvatar: propTypes.func.isRequired
  }
  constructor(props) {
    super(props);
    this.state = {
      icon: '',
      text: ''
    }
  }
  render() {
    const avatarList = 'boy,girl,man,woman,bull,chick,crab,hedgehog,hippopotamus,koala,lemur,pig,tiger,whale,zebra'
      .split(',')
      .map(v => ({
        icon: require(`../img/${v}.png`),
        text: v
      }))
    const header = this.state.icon ?
      <div><span>已选择头像</span><img style={{ width: 20 }} src={this.state.icon} alt="" /></div>
      : <div>请选择头像</div>
    return (
      <List renderHeader={header}>
        <Grid data={avatarList} columnNum={5}
          onClick={elm => {
            this.setState(elm)
            this.props.selectAvatar(elm.text)
          }}
        />
      </List>
    )
  }
}
export default AvatarSelect