import React, { Component } from 'react';
import './Collapse.css';

class Collapse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: props.collapsed
    };
  }

  handleClick = () =>
    this.setState({collapsed: !this.state.collapsed})

  render() {
    return (
      <div className={'Collapse' + (this.state.collapsed ? ' collapsed' : '')}>
        <h2 onClick={this.handleClick}>{this.props.title}</h2>
        <div className="items">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Collapse;
