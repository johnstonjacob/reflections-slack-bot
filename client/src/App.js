import React from 'react';
import './styles/App.css';
import Home from './components/home';
import Login from './components/login';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      isAuthenticated: false,
    };
    this.logIn = this.logIn.bind(this);
  }

  logIn() { // temporary log-in button to make sure pages are linked
    // console.log('LogIn Fired');
    this.setState({
      isAuthenticated: true,
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">LindenBot</h1>
        </header>

        {this.state.isAuthenticated ?
          <Home /> :
          <Login logIn={this.logIn} />}

        <p className="App-intro" />
      </div>
    );
  }
}

export default App;
