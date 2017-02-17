import React, { Component } from 'react';
import './Sidebar.css';
import Collapse from './Collapse.js';

class Sidebar extends Component {

  render() {
    return (
      <div className="Sidebar">
        {Object.keys(this.props.items).map((catalog, index) =>
          <Collapse key={catalog} collapsed={index === 0 ? false : true} title={catalog}>
            {this.props.items[catalog].map((algorithm) =>
              <h3 key={algorithm}>{algorithm}</h3>
            )}
          </Collapse>
        )}
      </div>
    );
  }
}

export default Sidebar;
