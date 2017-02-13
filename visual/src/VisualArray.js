import React, { Component } from 'react';
import './VisualArray.css';

var alg = window.alg;

class VisualArray extends Component {
  constructor(props) {
    super(props);
    this.state = {nums: [1, 3, 6, 2, 4]};

    this.handleInput = this.handleInput.bind(this);
    this.handleStart = this.handleStart.bind(this);
  }

  handleInput(event) {
    var nums = event.target.value.split(' ');
    this.setState({nums: nums});
  }

  handleStart(event) {
    alg.sort.insertSort(this.state.nums);
    this.setState({nums: this.state.nums});
  }

  render() {
    return (
      <div className="VisualArray">
        <input type="text" value={this.state.nums.join(' ')} onChange={this.handleInput} />
        <button type="button" onClick={this.handleStart}>Start</button>
        <div className="container">
          {this.state.nums.map((num, index) =>
            <div className="item" key={index} style={{height: num * 5 + 'px'}}></div>)}
        </div>
      </div>
    );
  }
}

export default VisualArray;
