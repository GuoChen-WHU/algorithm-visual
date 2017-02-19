import React, { Component } from 'react';
import './Sort.css';
import alg from '../../core/algorithm.js';

class Sort extends Component {
  constructor (props) {
    super(props);
    this.state = {
      nums: [50, 30, 25, 20, 40, 10],
      current: null,
      target: null,
      step: null // step of shell sort
    };
    this.timer = null;
    this.queue = [];
    this.duration = 500;
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
    var seqs = [],
        nums = this.state.nums.map((num) => parseInt(num, 10)),
        cb = function (...args) {seqs.push(args)};

    alg.sort[this.props.type](nums, cb);
    seqs.forEach((seq) => {
      this.addFrame({current: seq[0], target: seq[1], step: seq[3]});
      this.addFrame({nums: seq[2], current: seq[1]});
    });
    this.loop();
  }

  handlePause = (event) => {
    clearTimeout(this.timer);
  }

  handleResume = (event) => {
    this.loop();
  }

  handleStop = (event) => {
    clearTimeout(this.timer);
    this.setState({current: null, target: null});
    this.queue = [];
  }

  addFrame = (frame) => {
    this.queue.push(frame);
  }

  loop = () => {
    var frame = this.queue.shift();
    if (frame) {
      this.setState(frame);
      this.timer = setTimeout(this.loop, this.duration);
    } else {
      this.setState({current: null, target: null});
    }
  }

  render () {
    return (
      <div className="Sort">
        <input type="text" value={this.state.nums.join(' ')} onChange={this.handleInput} />
        <button type="button" onClick={this.handleRandom}>Random</button>
        <button type="button" onClick={this.handleStart}>Start</button>
        <button type="button" onClick={this.handlePause}>Pause</button>
        <button type="button" onClick={this.handleResume}>Resume</button>
        <button type="button" onClick={this.handleStop}>Stop</button>
        <div className="container">
          {this.state.nums.map((num, index) => {
            // For merge sort, current is a array.
            var isCurrent = Array.isArray(this.state.current)
                          ? this.state.current.indexOf(index) > -1
                          : index === this.state.current,
                className = 'item' +
                            (isCurrent ? ' current' : '') +
                            (index === this.state.target ? ' target' : '');
            return (
              <div className={className} key={index}>
                <div className="pillar" style={{height: num * 5 + 'px'}}></div>
                <span className="index">{index}</span>
              </div>
            );
          })}
        </div>
        {this.props.type === 'shell' ? <p className="note">Current Step: {this.state.step}</p> : ''}
      </div>
    );
  }
}

export default Sort;
