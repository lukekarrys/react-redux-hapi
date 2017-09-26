import React from 'react';
import { Link } from 'react-router-dom';

const App = ({ children }) => [
  <nav key='app-nav'>
    <Link to='/'>Locations</Link>
  </nav>,
  <main key='app-main'>{children}</main>
];

export default App;

