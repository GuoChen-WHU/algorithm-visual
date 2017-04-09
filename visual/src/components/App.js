import React from 'react';
import { Route, Redirect } from 'react-router';
import Navbar from './Navbar';
import Board from './Board';
import Controls from './Controls';
import Sort from './Sort';
import Heap from './Heap';

const App = () => (
  <div>
    <Navbar />

    <Redirect to="/sort/insert" />
    <Route path="/sort/:type" component={Sort} />
    <Route path="/heap/:type" component={Heap} />

    <Controls />

    <Board />
  </div>
);

export default App;
