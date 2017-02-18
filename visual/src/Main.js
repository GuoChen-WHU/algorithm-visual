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
      case 'shell sort':
        current = <Sort type="shell"/>;
        break;
      case 'bubble sort':
        current = <Sort type="bubble"/>;
        break;
      case 'select sort':
        current = <Sort type="select"/>;
        break;
      case 'merge sort':
        current = <Sort type="merge"/>;
        break;
      case 'quick sort':
        current = <Sort type="quick"/>;
        break;
      case 'count sort':
        current = <Sort type="count"/>;
        break;
      case 'radix sort':
        current = <Sort type="radix"/>;
        break;
      case 'bucket sort':
        current = <Sort type="bucket"/>;
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
