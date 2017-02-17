import React, { Component } from 'react';
import InsertSort from './InsertSort.js';
import MergeSort from './MergeSort.js';
import './Main.css';

class Main extends Component {
  render() {
    var current;
    switch(this.props.current) {
      case 'insert sort':
      default:
        current = <InsertSort />;
        break;
      case 'merge sort':
        current = <MergeSort />;
        break;
    }
    return (
      <div className="Main">
        {current}
      </div>
    );
  }
}

export default Main;
