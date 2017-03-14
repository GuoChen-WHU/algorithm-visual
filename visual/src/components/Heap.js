import React, { Component } from 'react';
import './Heap.css';
import alg from '../../../core/algorithm';
import animation from '../util/animation.js';
import Controls from './Controls.js';
import Node from './Node';

class Heap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nums: [2, 3, 6, 4, 5, 1, 7],
      current: null,
      target: null
    };
    this.rowStartIndex = this.CalculateRowStartIndex(10);
  }

  CalculateRowStartIndex(maxRow) {
    var indices = [];
    for (let i = 0; i < maxRow; i++) {
      indices.push(Math.pow(2, i) - 1);
    }
    return indices;
  }

  componentWillMount() {
    animation.setup(this.setFrame);
  }

  setFrame = (frame) => {
    this.setState(frame);
  }

  changeNums = (nums) => {
    this.setState({nums: nums});
  }

  setupFrames = () => {
    var heap = new alg.Heap(this.state.nums.concat()),
        cb = function(current, target, result) {
          if (result == null)
            animation.addFrame({current: current, target: target});
          else
            animation.addFrame({current: current, target: target, nums: result});
        };
    heap.maxHeapify(0, cb);
    animation.addFrame({current: null, target: null});
  }

  reset = () => {
    this.setState({current: null, target: null});
  }

  render() {
    const indices = this.rowStartIndex;
    var rows = [],
        currentRow = -1;
    this.state.nums.forEach((num, index) => {
      if (indices.indexOf(index) > -1) {
        rows.push([]);
        currentRow++;
      }
      var isCurrent = index === this.state.current,
          isTarget = index === this.state.target;
      rows[currentRow].push(
        <Node key={index} value={parseInt(num, 10)} isCurrent={isCurrent} isTarget={isTarget}/>
      );
    });

    return (
      <div className="Heap">
        <Controls
          nums={this.state.nums}
          changeNums={this.changeNums}
          setupFrames={this.setupFrames}
          reset={this.reset}/>
        {rows.map((row, index) => (
          <div key={index} className="floor">
            {row}
          </div>
        ))}
      </div>
    );
  }
}

export default Heap;
