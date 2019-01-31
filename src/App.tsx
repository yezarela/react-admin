import React from 'react';
import { Route } from 'react-router-dom';

import Admin from './screens/Admin/Admin';

const App = () => (
  <div>
    <Route path={'/'} component={Admin} />
  </div>
);

export default App;
