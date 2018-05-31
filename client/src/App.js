import React, { Component } from 'react';
import './styles/App.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      test: 'hi',
    };
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started TEST, edit <code>src/App.js</code> and save to reload.
          {this.state.test}
        </p>
      </div>
    );
  }
}

export default App;
