import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { values } from 'lodash';
import * as ACTIONS from '../actions';
import Error from '../components/error';
import Loading from '../components/loading';

class Locations extends React.Component {
  static fetchData = ACTIONS.fetchLocations

  componentDidMount() {
    this.props.fetchLocations(this.props.match.params);
  }

  render() {
    const { locations, syncing, error } = this.props;

    if (syncing) return <Loading />;
    if (error) return <Error error={error} />;

    return (
      <ul>
        {locations.map((location) => (
          <li key={location.woeid}>
            <Link to={`/locations/${location.woeid}`}>{location.title}</Link>
          </li>
        ))}
      </ul>
    );
  }
}

const mapStateToProps = ({ locations }, props) => {
  const key = ACTIONS.fetchLocations(props.match.params, true);
  return {
    locations: values(locations.entities),
    syncing: locations.syncing[key],
    error: locations.error[key]
  };
};

const mapPropsToDispatch = {
  fetchLocations: ACTIONS.fetchLocations
};

export default connect(mapStateToProps, mapPropsToDispatch)(Locations);
