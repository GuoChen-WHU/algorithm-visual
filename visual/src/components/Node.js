import React, { PropTypes } from 'react';
import './Node.css';

const Node = ({ value, isCurrent, isTarget }) => {
  var className = 'Node' +
                  (isCurrent ? ' current' : '') +
                  (isTarget ? ' target' : '');
  return (
    <div className={className}>{value}</div>
  );
}

Node.propTypes = {
  value: PropTypes.number
};

Node.defaultProps = {
  value: 0
};

export default Node;
