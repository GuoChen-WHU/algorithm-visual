import React, { Component, PropTypes } from 'react';
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
        <div className="content">
          {this.props.children}
        </div>
      </div>
    );
  }
}

Collapse.propTypes = {
  title: PropTypes.string,
  collapsed: PropTypes.bool
};

Collapse.defaultProps = {
  collapsed: true
};

export default Collapse;
