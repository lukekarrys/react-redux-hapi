import React from 'react';
import { connect } from 'react-redux';
import * as ACTIONS from '../actions';
import Error from '../components/error';
import Loading from '../components/loading';
import Forecast from '../components/forecast';

class Location extends React.Component {
  static fetchData = ACTIONS.fetchLocation

  componentDidMount() {
    this.props.fetchLocation(this.props.match.params);
  }

  render() {
    const { location, syncing, error } = this.props;

    if (syncing) return <Loading />;
    if (error) return <Error error={error} />;

    return [
      <h1 key='location-title'>{location.title}</h1>,
      <h2 key='location-subtitle'>Forecast</h2>,
      <Forecast key='location-forecast' weather={location.consolidated_weather} />
    ];
  }
}

const mapStateToProps = ({ locations }, props) => {
  const { id } = props.match.params;
  const key = ACTIONS.fetchLocation(props.match.params, true);
  return {
    location: locations.entities[id],
    syncing: locations.syncing[key],
    error: locations.error[key]
  };
};

const mapPropsToDispatch = {
  fetchLocation: ACTIONS.fetchLocation
};

export default connect(mapStateToProps, mapPropsToDispatch)(Location);
