import React from 'react';
import './App.css';
import { ComparisonBox } from './components/ComparisonBox';
// import { LeaderBoard } from './components/LeaderBoard';

// TODO: Move the request into the component
function App() {
  return (
    <div className="App">
      <h1>HUDSMash</h1>
      <ComparisonBox/>
    </div>
  );
}

export default App;
