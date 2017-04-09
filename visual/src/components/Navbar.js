import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav className="navbar navbar-default">
    <div className="container-fluid">
      <div className="navbar-header">
        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target=".navbar-collapse">
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
        </button>
        <a className="navbar-brand" href="#">Algorithm Visual</a>
      </div>
      <div className="collapse navbar-collapse">
        <ul className="nav navbar-nav">
          <li className="dropdown">
            <a href="#" className="dropdown-toggle" data-toggle="dropdown">
              Sort<span className="caret"></span>
            </a>
            <ul className="dropdown-menu">
              <li><Link to="/sort/insert">Insert Sort</Link></li>
              <li><Link to="/sort/shell">Shell Sort</Link></li>
              <li><Link to="/sort/merge">Merge Sort</Link></li>
              <li><Link to="/sort/bubble">Bubble Sort</Link></li>
              <li><Link to="/sort/select">Select Sort</Link></li>
              <li><Link to="/sort/quick">Quick Sort</Link></li>
              <li><Link to="/sort/count">Count Sort</Link></li>
              <li><Link to="/sort/radix">Radix Sort</Link></li>
              <li><Link to="/sort/bucket">Bucket Sort</Link></li>
            </ul>
          </li>
          <li className="dropdown">
            <a href="#" className="dropdown-toggle" data-toggle="dropdown">
              Heap<span className="caret"></span>
            </a>
            <ul className="dropdown-menu">
              <li><Link to="/heap/heapify">Max Heapify</Link></li>
              <li><Link to="/heap/build">Build Heap</Link></li>
              <li><Link to="/heap/sort">Heap Sort</Link></li>
            </ul>
          </li>
          <li className="dropdown">
            <a href="#" className="dropdown-toggle" data-toggle="dropdown">
              Binary Search Tree<span className="caret"></span>
            </a>
            <ul className="dropdown-menu">
              <li><Link to="/bst/search">Search</Link></li>
              <li><Link to="/bst/inorder">Inorder Walk</Link></li>
              <li><Link to="/bst/max">Maximum</Link></li>
              <li><Link to="/bst/min">Minimum</Link></li>
              <li><Link to="/bst/successor">Successor</Link></li>
              <li><Link to="/bst/predecessor">Predecessor</Link></li>
              <li><Link to="/bst/delete">Delete</Link></li>
            </ul>
          </li>
          <li className="dropdown">
            <a href="#" className="dropdown-toggle" data-toggle="dropdown">
              Red Black Tree<span className="caret"></span>
            </a>
            <ul className="dropdown-menu">
              <li><Link to="/rbt/leftRotate">Left Rotate</Link></li>
              <li><Link to="/rbt/rightRotate">Right Rotate</Link></li>
              <li><Link to="/rbt/insert">Insert</Link></li>
              <li><Link to="/rbt/delete">Delete</Link></li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
);

export default Navbar;
