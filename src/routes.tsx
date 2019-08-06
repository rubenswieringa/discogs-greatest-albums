import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { AddAlbum } from '@views/AddAlbum';

import { App } from './App';

const Routes: React.FunctionComponent = () => {
  return (
    <Router>
      <Route path="/" component={App} />
      <Route path="/add" component={AddAlbum} />
    </Router>
  );
};

export default Routes;
