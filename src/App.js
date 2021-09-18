import { useEffect, useState } from 'react';
import api from './app/api';

function App() {
  const [state, setState] = useState('previous');

  useEffect(() => {
    api
      .get('/ping')
      .then((response) => response.data)
      .then((message) => setState(message));
  }, []);

  return <div className="App">{state}</div>;
}

export default App;
