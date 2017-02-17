import React, { Component } from 'react';
import './Sort.css';
import alg from '../../core/algorithm.js';

class Sort extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nums: [50, 30, 25, 20, 40, 10],
      current: null,
      target: null
    };
    this.timer = null;
  }

  handleInput = (event) => {
    var nums = event.target.value.split(' ');
    this.setState({nums: nums});
  }

  handleRandom = (event) => {
    const minNum = 8,
          maxNum = 16,
          minVal = 5,
          maxVal = 50;

    var num = Math.round(minNum + Math.random() * (maxNum - minNum)),
        result = [],
        i;

    for (i = 0; i < num; i++) {
      result.push(Math.round(minVal + Math.random() * (maxVal - minVal)));
    }

    this.setState({nums: result});
  }

  handleStart = (event) => {
    var seq = [],
        nums = this.state.nums.map((num) => parseInt(num, 10)),
        cb = (curIdx, tarIdx, array) => seq.push([curIdx, tarIdx, array]);

    switch (this.props.type) {
      case 'insert':
      default:
        alg.sort.insertSort(nums, cb);
        break;
      case 'bubble':
        alg.sort.bubbleSort(nums, cb);
        break;
      case 'merge':
        alg.sort.mergeSort(nums, cb);
        break;
      case 'quick':
        alg.sort.quickSort(nums, cb);
        break;
    }
    this.startAnimation(seq);
  }

  handleStop = (event) => {
    clearTimeout(this.timer);
  }

  startAnimation(seq) {
    (function nextFrame() {
      var frame = seq.shift();
      if (frame) {
        this.setState({current: frame[0], target: frame[1]});
        this.timer = setTimeout(() => {
          this.setState({nums: frame[2], current: frame[1]});
          if (seq.length) {
            this.timer = setTimeout(nextFrame.bind(this), 500);
          } else {
            this.timer = setTimeout(() => this.setState({current: null, target: null}), 500);
          }
        }, 1000);
      }
    }.bind(this)());
  }

  render() {
    return (
      <div className="Sort">
        <input type="text" value={this.state.nums.join(' ')} onChange={this.handleInput} />
        <button type="button" onClick={this.handleRandom}>Random</button>
        <button type="button" onClick={this.handleStart}>Start</button>
        <button type="button" onClick={this.handleStop}>Stop</button>
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
