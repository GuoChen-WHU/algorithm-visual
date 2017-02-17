import React, { Component } from 'react';
import Sort from './Sort.js';
import './Main.css';

class Main extends Component {
  render() {
    var current;
    switch(this.props.current) {
      case 'insert sort':
      default:
        current = <Sort type="insert"/>;
        break;
      case 'bubble sort':
        current = <Sort type="bubble"/>;
        break;
      case 'merge sort':
        current = <Sort type="merge"/>;
        break;
    }
    return (
      <div className="Main">
        <h2>{this.props.current.toUpperCase()}</h2>
        {current}
      </div>
    );
  }
}

export default Main;
