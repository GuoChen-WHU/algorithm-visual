import React, { Component } from 'react';
import { connect } from 'react-redux';
import { clearMessages } from '../actions';
import './Board.css';

class Board extends Component {
  render() {
    return (
      <div
        className="Board">
        <ul className="list-group">
          <li key={'title'} className="list-group-item">Messages</li>
          {this.props.messages.map((msg, index) =>
            <li
              key={index}
              className="list-group-item list-group-item-success">
              {msg}
            </li>
          )}
          <button
            className="btn btn-primary btn-block"
            onClick={this.props.clearMessages}>
            Clear
          </button>
        </ul>
      </div>
    );
  }
};

const mapStateToProps = (state) => ({
  messages: state.messages
});

const mapDispatchToProps = {
  clearMessages
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Board);
