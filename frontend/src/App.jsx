import { useState, useEffect } from 'react';
import react from 'react';
import axios from 'axios';

function App() {
  useEffect(() => {
    axios.get('http://localhost:8000/weather/')
      .then(response => {
        console.log(response);
      });
  }, []);

  return (
    <>
    </>
  );
}

export default App;
