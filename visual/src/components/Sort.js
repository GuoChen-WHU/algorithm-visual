import React, { Component } from 'react';
import './Sort.css';
import alg from '../../../core/algorithm.js';
import animation from '../util/animation.js';
import Controls from './Controls.js';

class Sort extends Component {
  constructor (props) {
    super(props);
    this.state = {
      nums: [50, 30, 25, 20, 40, 10],
      current: null,
      target: null,
      step: null // step of shell sort
    };
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
    var seqs = [],
        // ensure nums are numbers
        nums = this.state.nums.map((num) => parseInt(num, 10)),
        cb = function (...args) {seqs.push(args)};

    alg.sort[this.props.match.params.type](nums, cb);
    seqs.forEach((seq) => {
      animation.addFrame({current: seq[0], target: seq[1], step: seq[3]});
      animation.addFrame({nums: seq[2], current: seq[1]});
    });
    animation.addFrame({current: null, target: null});
  }

  reset = () => {
    this.setState({current: null, target: null});
  }

  render () {
    const type = this.props.match.params.type;
    const title = type.replace(/^\w+?/, (letter) => letter.toUpperCase()) + ' Sort';

    return (
      <div className="Sort">
        <h1>{title}</h1>
        <Controls
          nums={this.state.nums}
          changeNums={this.changeNums}
          setupFrames={this.setupFrames}
          reset={this.reset}/>
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
        {type === 'shell' ? <p className="note">Current Step: {this.state.step}</p> : ''}
      </div>
    );
  }
}

export default Sort;
