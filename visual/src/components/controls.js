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

class Controls extends Component {
  constructor(props) {
    super(props);
    this.timer = null;
    this.frames = [];
  }

  onInputChange = (event) => {
    var nums = event.target.value.split(' ');
    this.props.changeNums(nums);
  }

  onRandom = () => {
    this.frames.length && this.onStop();
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
    this.frames.length && this.onStop();
    this.setupFrames();
    this.loop();
  }

  onPause = () => {
    clearTimeout(this.timer);
  }

  onResume = () => {
    this.loop();
  }

  onStop = () => {
    this.frames = [];
    clearTimeout(this.timer);
    this.props.changeCurrent(-1);
    this.props.changeTarget(-1);
  }

  setupFrames = () => {
    // ensure nums are numbers
    let nums = this.props.nums.map((num) => parseInt(num, 10));
    const cb = this.addFrame;

    const algorithm = mapRouteToAlg(this.props.location.pathname);
    algorithm(nums, cb);

    this.addFrame({current: -1, target: -1});
  }

  addFrame = (frame) => {
    this.frames.push(frame);
  }

  loop = () => {
    const frame = this.frames.shift();
    if (frame) {
      this.setFrame(frame);
      this.timer = setTimeout(this.loop, 500);
    }
  }

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
