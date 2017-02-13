import React, { Component } from 'react';
import './Sidebar.css';

class Sidebar extends Component {
  render() {
    return (
      <div className="Sidebar">
        <ul>
          <li className="Sidebar-module">
            <h2>Sort</h2>
            <ul>
              <li className="Sidebar-module-item">
                <h3>Insert Sort</h3>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    );
  }
}

export default Sidebar;
