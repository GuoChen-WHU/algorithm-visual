import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { changeNums, changeCurrent, changeTarget, addMessage } from '../actions';
import alg from '../../../core/algorithm';
import './Controls.css';

const algExp = /^\/(\w+)\/(\w+)$/;

// 根据路由确定使用的算法
const mapRouteToAlg = (location) => {
  const match = location.match(algExp);
  const category = match[1];
  const type = match[2];
  return category && type && alg[category][type];
};

const DURATION = 500;

class Controls extends Component {
  constructor(props) {
    super(props);
    this.runner = Promise.resolve();
    this.isPaused = true;
    // used to stop animation
    this.timer = null;
  }

  onInputChange = (event) => {
    var nums = event.target.value.split(' ');
    this.props.changeNums(nums);
  }

  onRandom = () => {
    this.isPaused || this.onStop();
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
    if (!this.isPaused) return;
    this.isPaused = false;
    // ensure nums are numbers
    let nums = this.props.nums.map((num) => parseInt(num, 10));
    const algorithm = mapRouteToAlg(this.props.location.pathname);
    algorithm(nums, this.addFrame);

    // reset current and target
    this.addFrame({current: -1, target: -1});
  }

  onPause = () => {
    this.isPaused = true;
  }

  onResume = () => {
    this.isPaused = false;
    this.resumeCall && this.resumeCall();
  }

  onStop = () => {
    this.isPaused = true;
    this.runner = Promise.resolve();
    clearTimeout(this.timer);
    this.setFrame({current: -1, target: -1});
  }

  /**
   * Add a promise for setting frame to the promise chain
   */
  addFrame = frame => this.runner = this.runner.then(() =>
    new Promise(resolve => {
      // resolve the promise to move on if not paused
      if (!this.isPaused) {
        this.timer = setTimeout(() => {
          this.setFrame(frame);
          resolve();
        }, DURATION);
      // set a callback for resolve later
      } else {
        this.resumeCall = () => {
          this.setFrame(frame);
          resolve();
        };
      }
    })
  )

  /**
   * Dispatch actions
   */
  setFrame = (frame) => {
    frame.nums && this.props.changeNums(frame.nums);
    frame.current != null && this.props.changeCurrent(frame.current);
    frame.target != null && this.props.changeTarget(frame.target);
    frame.message && this.props.addMessage(frame.message);
  }

  render() {
    return (
      <div className="Controls">
        <section>
          <input type="text" value={this.props.nums.join(' ')} onChange={this.onInputChange} />
        </section>
        <section className="btn-group btn-group-justified">
          <div className="btn-group">
            <button type="button" className="btn btn-default" onClick={this.onRandom}>Random</button>
          </div>
          <div className="btn-group">
            <button type="button" className="btn btn-default" onClick={this.onStart}>Start</button>
          </div>
          <div className="btn-group">
            <button type="button" className="btn btn-default" onClick={this.onPause}>Pause</button>
          </div>
          <div className="btn-group">
            <button type="button" className="btn btn-default" onClick={this.onResume}>Resume</button>
          </div>
          <div className="btn-group">
            <button type="button" className="btn btn-default" onClick={this.onStop}>Stop</button>
          </div>
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  nums: state.nums
});

const mapDispatchToProps = {
  changeNums,
  changeCurrent,
  changeTarget,
  addMessage
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Controls));
