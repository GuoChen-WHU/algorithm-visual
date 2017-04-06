import React from 'react';
import { connect } from 'react-redux';
import './Sort.css';

const Sort = ({ nums, current, target, match }) => {
  const type = match.params.type;
  const title = type.replace(/^\w+?/, (letter) => letter.toUpperCase()) + ' Sort';

  return (
    <div className="Sort">
      <h1>{title}</h1>
      <div className="container">
        {nums.map((num, index) => {
          // For merge sort, current is a array.
          var isCurrent = Array.isArray(current)
                        ? current.indexOf(index) > -1
                        : index === current,
              className = 'item' +
                          (isCurrent ? ' current' : '') +
                          (index === target ? ' target' : '');
          return (
            <div className={className} key={index}>
              <div className="pillar" style={{height: num * 5 + 'px'}}></div>
              <span className="index">{index}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  nums: state.nums,
  current: state.current,
  target: state.target
});

export default connect(
  mapStateToProps,
  null
)(Sort);
