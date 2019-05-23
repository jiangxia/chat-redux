import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { TabBar } from 'antd-mobile';
import propTypes from 'prop-types'

@withRouter
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