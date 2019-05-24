import React, { Component } from 'react';
import { Result, List, WhiteSpace } from 'antd-mobile';
import { connect } from 'react-redux'

@connect(
  state => state.user
)
class User extends Component {
  render() {
    const props = this.props;
    const Item = List.Item;
    const Brief = Item.Brief;
    return (
      props.user ?
        <div>
          <Result

            img={<img src={require(`../img/${props.avatar}.png`)} alt="" style={{ width: 50 }} />}
            title={props.user}
            message={props.type === 'boss' ? props.company : null}
          />
          <List renderHeader={() => '简介'}>
            <Item multipleLine>
              {props.title}
              {props.desc.split('\n').map(v => <Brief key={v}>{v}</Brief>)}
              {props.money ? <Brief>{props.money}</Brief> : null}
            </Item>
          </List>
          <WhiteSpace></WhiteSpace>
          <List>
            <Item onClick={this.logout}>退出登录</Item>
          </List>
        </div> : null
    )
  }
}

export default User 