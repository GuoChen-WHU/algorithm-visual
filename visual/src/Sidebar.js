import React, { Component } from 'react';
import './Sidebar.css';
import Collapse from './Collapse.js';

class Sidebar extends Component {

  render() {
    return (
      <div className="Sidebar">
        <Collapse collapsed={false} title="Sort">
          <h3>Insert Sort</h3>
          <h3>Merge Sort</h3>
          <h3>Quick Sort</h3>
        </Collapse>
        <Collapse collapsed={true} title="Heap">
          <h3>Heapify</h3>
          <h3>Build heap</h3>
          <h3>Heap sort</h3>
        </Collapse>
      </div>
    );
  }
}

export default Sidebar;
