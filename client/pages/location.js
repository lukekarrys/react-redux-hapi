import React from 'react';
import { connect } from 'react-redux';
import * as ACTIONS from '../actions';

class Location extends React.Component {
  static fetchData = ACTIONS.fetchLocation

  componentDidMount() {
    this.props.fetchLocation(this.props.match.params);
  }

  render() {
    const { location, syncing } = this.props;

    if (syncing) {
      return (
        <div>
          <h1>Loading</h1>
        </div>
      );
    }

    return (
      <div>
        <h1>{location.title}</h1>
        <h2>Forecast</h2>
        {(location.consolidated_weather || []).map((forecast) => (
          <div key={forecast.id}>
            <h3>{forecast.applicable_date}</h3>
            <h4>{forecast.min_temp} / {forecast.max_temp}</h4>
          </div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  const { id } = props.match.params;
  const { locations: { entities: locations, syncing } } = state;
  const location = locations[id];
  return {
    syncing,
    location
  };
};

const mapPropsToDispatch = {
  fetchLocation: ACTIONS.fetchLocation
};

export default connect(mapStateToProps, mapPropsToDispatch)(Location);
