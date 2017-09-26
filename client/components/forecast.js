import React from 'react';

const Forecast = ({ weather }) => {
  if (!weather) return 'Loading forecast...';
  return weather.map((f) => (
    <div key={f.id}>
      <h3>{f.applicable_date}</h3>
      <h4>{f.min_temp} / {f.max_temp}</h4>
    </div>
  ));
};

export default Forecast;
