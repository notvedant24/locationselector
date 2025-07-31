import React, { useState, useEffect } from 'react'

const BASE_URL = 'https://crio-location-selector.onrender.com'

function LocationSelector() {
  const [countries, setCountries] = useState([])
  const [states, setStates] = useState([])
  const [cities, setCities] = useState([])

  const [selectedCountry, setSelectedCountry] = useState('')
  const [selectedState, setSelectedState] = useState('')
  const [selectedCity, setSelectedCity] = useState('')

  useEffect(() => {
    fetch(`${BASE_URL}/countries`)
      .then((res) => res.json())
      .then((data) => setCountries(data))
      .catch((err) => console.error(err))
  }, [])

  useEffect(() => {
    if (selectedCountry) {
      fetch(`${BASE_URL}/country=${selectedCountry}/states`)
        .then((res) => res.json())
        .then((data) => setStates(data))
        .catch((err) => console.error(err))
    }
    setSelectedState('')
    setSelectedCity('')
    setStates([])
    setCities([])
  }, [selectedCountry])

  useEffect(() => {
    if (selectedCountry && selectedState) {
      fetch(`${BASE_URL}/country=${selectedCountry}/state=${selectedState}/cities`)
        .then((res) => res.json())
        .then((data) => setCities(data))
        .catch((err) => console.error(err))
    }
    setSelectedCity('')
    setCities([])
  }, [selectedState])

  return (
    <div>
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
        <select
          data-testid="country"
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
        >
          <option value="">Select Country</option>
          {countries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>

        <select
          data-testid="state"
          value={selectedState}
          onChange={(e) => setSelectedState(e.target.value)}
          disabled={!selectedCountry}
        >
          <option value="">Select State</option>
          {states.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>

        <select
          data-testid="city"
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          disabled={!selectedState}
        >
          <option value="">Select City</option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>

      {selectedCity && (
        <p data-testid="selected-location">
          You selected {selectedCity}, {selectedState}, {selectedCountry}
        </p>
      )}
    </div>
  )
}

export default LocationSelector
