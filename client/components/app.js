import React from 'react';
import { Link } from 'react-router-dom';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <nav>
          <Link to='/locations'>Locations</Link>
        </nav>
        <main>{this.props.children}</main>
      </div>
    );
  }
}
