import React from 'react';
import LocationSelector from './LocationSelector';

function App() {
  return (
    <div style={{
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center', // ⬅️ This centers content horizontally
      fontFamily: 'sans-serif',
      paddingTop: '3rem', // optional vertical spacing
    }}>
      <h1 style={{ marginBottom: '2rem', textAlign: 'center' }}>Select Location</h1>
      <LocationSelector />
    </div>
  );
}

export default App;
