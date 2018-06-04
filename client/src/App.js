import React from 'react';
import './styles/App.css';
import Home from './components/home';
import Login from './components/login';
import Meeting from './components/meeting';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      show: 'home',
      isAuthenticated: false,
      // cohorts: [33, 34, 35],
      // students: ['a', 'b', 'c'],
    };

    this.changeView = this.changeView.bind(this);
    this.logIn = this.logIn.bind(this);
  }

  changeView(view) {
    this.setState({
      show: view,
    });
  }

  logIn() {
    this.setState({
      isAuthenticated: true,
    });
  }

  render() {
    switch (this.state.show) {
      case 'meeting':
        return (
          <Meeting />
        );

      default:
        return (
          this.state.isAuthenticated ?
            <Home changeView={this.changeView} /> :
            <Login logIn={this.logIn} />
        );
    }
  }
}

export default App;

// this.state.isAuthenticated ?
//             <Home /> :
//             <Login logIn={this.logIn} />
