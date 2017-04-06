import React, { PropTypes } from 'react';
import './Node.css';

const Node = ({ value, isCurrent, isTarget, isPlaceholder }) => {
  var className = 'Node' +
                  (isCurrent ? ' current' : '') +
                  (isTarget ? ' target' : '') +
                  (isPlaceholder ? ' placeholder' : '');
  return (
    <div className={className}>{value}</div>
  );
}

Node.propTypes = {
  value: PropTypes.number
};

export default Node;
