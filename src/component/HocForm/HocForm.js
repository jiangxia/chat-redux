import React from 'react'

export default function HocForm(Comp) {
  return class WrapComp extends React.Component {
    constructor(props) {
      super(props);
      this.state = {};
    }
    handleChange = (key, value) => {
      this.setState({
        [key]: value
      })
    }

    render() {
      return <Comp handleChange={this.handleChange} state={this.state} {...this.props}></Comp>
    }
  }
}