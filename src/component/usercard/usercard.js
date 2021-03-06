import React, { Component } from 'react'
import { Card, WhiteSpace, WingBlank } from 'antd-mobile'
import propTypes from 'prop-types'
import { withRouter } from 'react-router-dom';

@withRouter
class UserCard extends Component {
  static propTypes = {
    userlist: propTypes.array.isRequired
  }

  handleClick = (v) => { 
    this.props.history.push(`/chat/${v._id}`)
  }

  render() {
    const Header = Card.Header;
    const Body = Card.Body;

    return (
      <WingBlank>
        {this.props.userlist.map(v => {
          return v.avatar ?
            (<div key={v._id}>
              <WhiteSpace></WhiteSpace>
              <Card
                onClick={()=>this.handleClick(v)}
              >
                <Header
                  title={v.user}
                  thumb={require(`../img/${v.avatar}.png`)}
                  extra={<span>{v.title}</span>}
                ></Header>
                <Body>
                  {v.type === 'boss' ? <div>公司:{v.company}</div> : null}
                  {v.desc.split('\n').map(d => {
                    return <div key={d}>{d}</div>
                  })}
                  {v.type === 'boss' ? <div>薪资:{v.money}</div> : null}
                </Body>
              </Card>
            </div>)
            : null;
        })}
      </WingBlank>
    )
  }
}

export default UserCard