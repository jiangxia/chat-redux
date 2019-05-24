import React, { Component } from 'react';
import { Result, List, WhiteSpace, Modal } from 'antd-mobile';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'
import browserCookie from 'browser-cookies'
import { logoutSubmit } from '../../redux/user.redux'

@connect(
  state => state.user,
  { logoutSubmit }
)
class User extends Component {
  logout = () => {
    const alert = Modal.alert

    alert('注销', '确认退出登录吗???', [
      { text: '取消', onPress: () => console.log('cancel') },
      {
        text: '确认', onPress: () => {
          browserCookie.erase('userid')
          this.props.logoutSubmit()
        }
      }
    ])
  }

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
        </div> : <Redirect to={this.props.redirectTo}/>
    )
  }
}

export default User 