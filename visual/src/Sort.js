import React, { Component } from 'react';
import './Sort.css';
import alg from '../../core/algorithm.js';

class Sort extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nums: [5, 3, 6, 2, 4, 1],
      current: null,
      target: null
    };

    this.handleInput = this.handleInput.bind(this);
    this.handleStart = this.handleStart.bind(this);
  }

  handleInput(event) {
    var nums = event.target.value.split(' ');
    this.setState({nums: nums});
  }

  handleStart(event) {
    var seq = [],
        nums = this.state.nums.map((num) => parseInt(num, 10)),
        cb = (curIdx, tarIdx, array) => seq.push([curIdx, tarIdx, array]);
    if (this.props.type === 'insert') alg.sort.insertSort(nums, cb);
    else if (this.props.type === 'bubble') alg.sort.bubbleSort(nums, cb);
    else if (this.props.type === 'merge') alg.sort.mergeSort(nums, cb);
    this.startAnimation(seq);
  }

  startAnimation(seq) {
    (function nextFrame() {
      var frame = seq.shift();
      if (frame) {
        this.setState({current: frame[0], target: frame[1]});
        setTimeout(() => {
          this.setState({nums: frame[2], current: frame[1]});
          if (seq.length) {
            setTimeout(nextFrame.bind(this), 500);
          } else {
            setTimeout(() => this.setState({current: null, target: null}), 500);
          }
        }, 1000);
      }
    }.bind(this)());
  }

  render() {
    return (
      <div className="Sort">
        <input type="text" value={this.state.nums.join(' ')} onChange={this.handleInput} />
        <button type="button" onClick={this.handleStart}>Start</button>
        <div className="container">
          {this.state.nums.map((num, index) => {
            // For insert and bubble, current is a number, for merge, current is a array.
            var isCurrent = Array.isArray(this.state.current)
                          ? this.state.current.indexOf(index) > -1
                          : index === this.state.current,
                className = 'item' +
                            (isCurrent ? ' current' : '') +
                            (index === this.state.target ? ' target' : '');
            return <div className={className} key={index} style={{height: num * 5 + 'px'}}></div>;
          })}
        </div>
      </div>
    );
  }
}

export default Sort;
