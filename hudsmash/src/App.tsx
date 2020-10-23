import React from 'react';
import './App.css';
import { ComparisonBox, foodPair } from './components/ComparisonBox';

// TODO: Move the request into the component
class App extends React.Component<{}, foodPair> {
  async componentDidMount() {
    try {
      fetch('http://localhost:5000/getMatch').then(res => res.json()).then(data => {
        this.setState(data);
      });
      console.log(this.state);
    } catch (error) {
      console.log(error);
    }
  }

  constructor({}) {
    super({});
    this.state = {
      food1: {
        name: '',
        link: '',
        elo: 500,
      },
      food2: {
        name: '',
        link: '',
        elo: 500,
      },
    }
  }

  render() {
    return (
      <div className="App">
        <h1>HUDSMash</h1>
        <ComparisonBox {...this.state}/>
      </div>
  );
  }
}

export default App;
