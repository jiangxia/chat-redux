import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { TabBar } from 'antd-mobile';
import propTypes from 'prop-types';
import { connect } from 'react-redux'

@withRouter
@connect(
  state => state.chat
)
class NavlinkBar extends Component {
  static propTypes = {
    data: propTypes.array.isRequired
  }

  render() {
    const navList = this.props.data.filter(v => !v.hide);
    const { pathname } = this.props.location;
    return (
      <TabBar>
        {navList.map(v => (
          <TabBar.Item
            badge={v.path === '/msg' ? this.props.unread : 0}
            key={v.path}
            title={v.text}
            icon={{ uri: require(`./img/${v.icon}.png`) }}
            selectedIcon={{ uri: require(`./img/${v.icon}-active.png`) }}
            selected={pathname === v.path}
            onPress={() => {
              this.props.history.push(v.path)
            }}
          >

          </TabBar.Item>
        ))}
      </TabBar>
    )
  }
}

export default NavlinkBar