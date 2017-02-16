import React, { Component } from 'react';
import './VisualArray.css';
import alg from '../../core/algorithm.js';

class VisualArray extends Component {
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
    var seq = [];
    alg.sort.insertSort(this.state.nums.map((num) => parseInt(num, 10)), (curIdx, tarIdx, array) => seq.push([curIdx, tarIdx, array]));
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
      <div className="VisualArray">
        <input type="text" value={this.state.nums.join(' ')} onChange={this.handleInput} />
        <button type="button" onClick={this.handleStart}>Start</button>
        <div className="container">
          {this.state.nums.map((num, index) => {
            var className = 'item' +
                            (index === this.state.current ? ' current' : '') +
                            (index === this.state.target ? ' target' : '');
            return <div className={className} key={index} style={{height: num * 5 + 'px'}}></div>;
          })}
        </div>
      </div>
    );
  }
}

export default VisualArray;
