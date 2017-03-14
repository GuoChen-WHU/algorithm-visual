import React, { PropTypes } from 'react';
import Sort from './Sort.js';
import Heap from './Heap.js';
import './Main.css';

const Main = ({ current }) => {
  var stage;
  switch(current) {
    case 'insert sort':
      stage = <Sort type="insert"/>;
      break;
    case 'shell sort':
      stage = <Sort type="shell"/>;
      break;
    case 'bubble sort':
      stage = <Sort type="bubble"/>;
      break;
    case 'select sort':
      stage = <Sort type="select"/>;
      break;
    case 'merge sort':
      stage = <Sort type="merge"/>;
      break;
    case 'quick sort':
      stage = <Sort type="quick"/>;
      break;
    case 'count sort':
      stage = <Sort type="count"/>;
      break;
    case 'radix sort':
      stage = <Sort type="radix"/>;
      break;
    case 'bucket sort':
      stage = <Sort type="bucket"/>;
      break;
    case 'heapify':
      stage = <Heap/>;
      break;
    default:
      stage = null;
      break;
  }
  return (
    <div className="Main">
      <h2>{current.toUpperCase()}</h2>
      {stage}
    </div>
  );
};

Main.propTypes = {
  current: PropTypes.string
};

export default Main;
