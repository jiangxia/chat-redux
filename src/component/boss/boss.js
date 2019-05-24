import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card, WhiteSpace, WingBlank } from 'antd-mobile'
import { getUserList } from '../../redux/chatuser.redux'

@connect(
  state => state.chatuser,
  { getUserList }
)
class Boss extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
  }

  componentDidMount() {
    this.props.getUserList('genius')
  }

  render() {
    const Header = Card.Header;
    const Body = Card.Body;
    console.log(this.state);

    return (
      <WingBlank>
        {this.props.userlist.map(v => {
          return v.avatar ?
            (<div key={v._id}>
              <WhiteSpace></WhiteSpace>
              <Card>
                <Header
                  title={v.user}
                  thumb={require(`../img/${v.avatar}.png`)}
                  extra={<span>{v.title}</span>}
                ></Header>
                <Body>
                  {v.desc.split('\n').map(d => {
                    return <div key={d}>{d}</div>
                  })}
                </Body>
              </Card>
            </div>)
            : null;
        })}
      </WingBlank>
    )
  }
}

export default Boss
