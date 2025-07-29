import React, { useState, useEffect } from 'react';

const LocationSelector = () => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  const fetchCountries = async () => {
    const res = await fetch(`https://crio-location-selector.onrender.com/countries`);
    const data = await res.json();
    setCountries(data);
  };

  const fetchStates = async (country) => {
    const res = await fetch(`https://crio-location-selector.onrender.com/country=${country}/states`);
    const data = await res.json();
    setStates(data);
  };

  const fetchCities = async (country, state) => {
    const res = await fetch(`https://crio-location-selector.onrender.com/country=${country}/state=${state}/cities`);
    const data = await res.json();
    setCities(data);
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  const handleCountryChange = (e) => {
    const country = e.target.value;
    setSelectedCountry(country);
    setSelectedState('');
    setSelectedCity('');
    setStates([]);
    setCities([]);
    if (country) fetchStates(country);
  };

  const handleStateChange = (e) => {
    const state = e.target.value;
    setSelectedState(state);
    setSelectedCity('');
    setCities([]);
    if (state) fetchCities(selectedCountry, state);
  };

  const handleCityChange = (e) => {
    const city = e.target.value;
    setSelectedCity(city);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1rem' }}>
        <div>
          <label htmlFor="country">Country:</label><br />
          <select id="country" value={selectedCountry} onChange={handleCountryChange}>
            <option value="">Select Country</option>
            {countries.map((country) => (
              <option key={country} value={country}>{country}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="state">State:</label><br />
          <select id="state" value={selectedState} onChange={handleStateChange} disabled={!selectedCountry}>
            <option value="">Select State</option>
            {states.map((state) => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="city">City:</label><br />
          <select id="city" value={selectedCity} onChange={handleCityChange} disabled={!selectedState}>
            <option value="">Select City</option>
            {cities.map((city) => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>
      </div>

      {selectedCountry && selectedState && selectedCity && (
        <p>You selected {selectedCity}, {selectedState}, {selectedCountry}</p>
      )}
    </div>
  );
};

export default LocationSelector;
