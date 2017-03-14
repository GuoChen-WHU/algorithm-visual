import React, { PropTypes } from 'react';

class Controls extends Component {
  onRandom = () => {
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

    this.props.onInputChange(result.join(' '));
  }

  onStart = () => {
    var seqs = [],
        nums = this.state.nums.map((num) => parseInt(num, 10)),
        cb = function (...args) {seqs.push(args)};

    alg.sort[this.props.type](nums, cb);
    seqs.forEach((seq) => {
      animation.addFrame({current: seq[0], target: seq[1], step: seq[3]});
      animation.addFrame({nums: seq[2], current: seq[1]});
    });
    animation.addFrame({current: null, target: null});
    animation.loop();
  }

  onPause = () => {
    animation.pause();
  }

  render() {
    return (
      <input type="text" value={nums.join(' ')} onChange={onInputChange} />
      <div className="controls">
        <button type="button" onClick={this.handleRandom}>Random</button>
        <button type="button" onClick={this.handleStart}>Start</button>
        <button type="button" onClick={this.handlePause}>Pause</button>
        <button type="button" onClick={this.handleResume}>Resume</button>
        <button type="button" onClick={this.handleStop}>Stop</button>
      </div>
    );
  }
}

Controls.propTypes = {
  nums: PropTypes.number.isRequired
};

export default Controls;
