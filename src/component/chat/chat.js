import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getMsgList, sendMsg, recvMsg } from '../../redux/chat.redux'
import { List, InputItem, NavBar } from 'antd-mobile'

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
    this.props.getMsgList()
    this.props.recvMsg()
    // socket.on('recvmsg', (data) => {
    //   this.setState({
    //     msg: [...this.state.msg, data.text]
    //   })
    // })
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
    const user = this.props.match.params.user;
    const Item = List.Item;
    return (
      <div id="chat-page">
        <NavBar mode="dark">
          {user}
        </NavBar>
        {this.props.chat.chatmsg.map(v => {
          return v.from === user ?
            (
              <List key={v._id}>
                <Item>{v.content}</Item>
              </List>
            ) : (
              <List key={v._id}>
                <Item extra={'avatar'} className="chat-me">{v.content}</Item>
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