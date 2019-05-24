import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getMsgList, sendMsg, recvMsg } from '../../redux/chat.redux'
import { List, InputItem, NavBar, Icon } from 'antd-mobile'

@connect(
  state => state,
  { getMsgList, sendMsg, recvMsg }
)
class Chat extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: '',
      msg: []
    }
  }

  componentDidMount() {
    if (!this.props.chat.chatmsg.length) {
      this.props.getMsgList()
      this.props.recvMsg()
    }
  }

  handleSubmit() {
    // socket.emit('sendmsg', { text: this.state.text })
    const from = this.props.user._id;
    console.log(this.props);

    const to = this.props.match.params.user;
    const msg = this.state.text;
    this.props.sendMsg({ from, to, msg });
    this.setState({ text: '' })
  }

  render() {
    const userid = this.props.match.params.user;
    const Item = List.Item;
    const users = this.props.chat.users;
    if (!users[userid]) {
      return null;
    }
    return (
      <div id="chat-page">
        <NavBar
          mode="dark"
          icon={<Icon type="left" />}
          onLeftClick={() => {
            this.props.history.goBack()
          }}
        >
          {users[userid].name}
        </NavBar>
        {this.props.chat.chatmsg.map(v => {
          const avatar = require(`../img/${users[v.from].avatar}.png`)

          return v.from === userid ?
            (
              <List key={v._id}>
                <Item
                  thumb={avatar}
                >{v.content}</Item>
              </List>
            ) : (
              <List key={v._id}>
                <Item extra={<img src={avatar} />} className="chat-me">{v.content}</Item>
              </List>

            )
        })}
        <div className="stick-footer">
          <List>
            <InputItem
              value={this.state.text}
              onChange={(v) => this.setState({ text: v })}
              placeholder={"请输入信息"}
              extra={<span onClick={() => this.handleSubmit()}>发送</span>}
            ></InputItem>
          </List>
        </div>
      </div>
    )

  }
}

export default Chat