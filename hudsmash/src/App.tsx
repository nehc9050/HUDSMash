import React from 'react';
import './App.css';
import { ComparisonBox } from './components/ComparisonBox';
import Title from './components/Title';
import HelpModal from './components/HelpModal';

// TODO: Move the request into the component
function App() {
  return (
    <div className="App">
      <Title/>
      <ComparisonBox/>
      <HelpModal/>
    </div>
  );
}

export default App;
