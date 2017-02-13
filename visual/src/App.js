import React, { Component } from 'react';
import './App.css';
import Sidebar from './Sidebar.js';
import VisualArray from './VisualArray.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Algorithm Visual</h2>
        </div>
        <Sidebar />
        <VisualArray />
      </div>
    );
  }
}

export default App;
