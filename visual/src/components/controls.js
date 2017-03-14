import React, { Component, PropTypes } from 'react';
import animation from '../util/animation.js';
import './Controls.css';

class Controls extends Component {
  onInputChange = (event) => {
    var nums = event.target.value.split(' ');
    this.props.changeNums(nums);
  }

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

    this.props.changeNums(result);
  }

  onStart = () => {
    this.props.setupFrames();
    animation.start();
  }

  onPause = () => {
    animation.pause();
  }

  onResume = () => {
    animation.start();
  }

  onStop = () => {
    animation.stop();
    this.props.reset();
  }

  render() {
    return (
      <div className="Controls">
        <section>
          <input type="text" value={this.props.nums.join(' ')} onChange={this.onInputChange} />
        </section>
        <section>
          <button type="button" onClick={this.onRandom}>Random</button>
          <button type="button" onClick={this.onStart}>Start</button>
          <button type="button" onClick={this.onPause}>Pause</button>
          <button type="button" onClick={this.onResume}>Resume</button>
          <button type="button" onClick={this.onStop}>Stop</button>
        </section>
      </div>
    );
  }
}

Controls.propTypes = {
  nums: PropTypes.array.isRequired,
  changeNums: PropTypes.func.isRequired,
  setupFrames: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired
};

export default Controls;
