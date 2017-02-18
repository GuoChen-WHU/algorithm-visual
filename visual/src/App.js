import React, { Component } from 'react';
import './App.css';
import Sidebar from './Sidebar.js';
import Main from './Main.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 'insert sort'
    };
    this.algorithms = {
      Sort: [
        'insert sort',
        'shell sort',
        'merge sort',
        'bubble sort',
        'select sort',
        'quick sort',
        'count sort',
        'radix sort',
        'bucket sort'
      ],
      Heap: [
        'heapify',
        'build heap',
        'heap sort'
      ]
    };
  }

  handlerSidebarClick = (e) => {
    var content = e.target.innerHTML;
    if (Object.keys(this.algorithms).some((catalog) => this.algorithms[catalog].indexOf(content) > -1)) {
      this.setState({current: content});
    }
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Algorithm Visual</h2>
        </div>
        <div className="App-body" onClick={this.handlerSidebarClick}>
          <Sidebar items={this.algorithms}/>
          <Main current={this.state.current}/>
        </div>
      </div>
    );
  }
}

export default App;
