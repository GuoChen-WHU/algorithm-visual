import React, { PropTypes } from 'react';
import './Sidebar.css';
import Collapse from './Collapse.js';

const Sidebar = ({ items, onAlgChange }) => (
  <div className="Sidebar">
    {Object.keys(items).map((catalog, index) =>
      <Collapse key={catalog} collapsed={index === 0 ? false : true} title={catalog}>
        {items[catalog].map((algorithm) =>
          <h3 className="alg-title" key={algorithm} onClick={() => onAlgChange(algorithm)}>{algorithm}</h3>
        )}
      </Collapse>
    )}
  </div>
);

Sidebar.propTypes = {
  items: PropTypes.object,
  onAlgChange: PropTypes.func
};

export default Sidebar;
