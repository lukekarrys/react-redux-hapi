import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { values } from 'lodash';
import * as ACTIONS from '../actions';

class Locations extends React.Component {
  static fetchData = ACTIONS.fetchLocations

  componentDidMount() {
    this.props.fetchLocations(this.props.match.params);
  }

  render() {
    const { locations } = this.props;
    return (
      <div>
        <ul>
          {locations.map((location) => (
            <li key={location.woeid}>
              <Link to={`/locations/${location.woeid}`}>{location.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  locations: values(state.locations.entities)
});

const mapPropsToDispatch = {
  fetchLocations: ACTIONS.fetchLocations
};

export default connect(mapStateToProps, mapPropsToDispatch)(Locations);
