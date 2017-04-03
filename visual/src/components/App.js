import React from 'react';
import { Route, Redirect } from 'react-router';
import Navbar from './Navbar';
import Sort from './Sort';
import Heap from './Heap';

const App = () => (
  <div>
    <Navbar />

    <Redirect to="/sort/insert" />
    <Route path="/sort/:type" component={Sort} />
    <Route path="/heap/:type" component={Heap} />
  </div>
);

export default App;
