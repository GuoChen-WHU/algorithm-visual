import React, { Component } from 'react';
import { connect } from 'react-redux';
import Node from './Node';
import './Heap.css';

class Heap extends Component {
  constructor(props) {
    super(props);
    this.rowStartIndex = this.calculateRowStartIndex(10);
  }

  calculateRowStartIndex(maxRow) {
    var indices = [];
    for (let i = 0; i < maxRow; i++) {
      indices.push(Math.pow(2, i) - 1);
    }
    return indices;
  }

  addPlaceholders(rows) {
    const height = rows.length,
      diff = Math.pow(2, height - 1) - rows[height - 1].length;

    for (let i = 0; i < diff; i++) {
      rows[height - 1].push(
        <Node key={`ph${i}`} isPlaceholder={true} />
      );
    }
  }

  render() {
    const indices = this.rowStartIndex;
    let rows = [],
        currentRow = -1;
    this.props.nums.forEach((num, index) => {
      if (indices.indexOf(index) > -1) {
        rows.push([]);
        currentRow++;
      }
      const isCurrent = index === this.props.current,
          isTarget = index === this.props.target;
      rows[currentRow].push(
        <Node key={index} value={parseInt(num, 10)} isCurrent={isCurrent} isTarget={isTarget}/>
      );
    });
    this.addPlaceholders(rows);

    return (
      <div className="Heap">
        <h1>{`Heap-${this.props.match.params.type}`}</h1>
        {rows.map((row, index) => (
          <div key={index} className="floor">
            {row}
          </div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  nums: state.nums,
  current: state.current,
  target: state.target
});

export default connect(
  mapStateToProps,
  null
)(Heap);
