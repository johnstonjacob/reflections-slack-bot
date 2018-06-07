import React from 'react';
import './styles/App.css';
import Home from './components/home';
import Login from './components/login';
import Meeting from './components/meeting/meeting';
import axios from 'axios';
import Response from './components/studentResponse';

axios.defaults.withCredentials = true;

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
    this.logOut = this.logOut.bind(this);
    this.test = this.test.bind(this);
  }


  componentDidMount() {
    axios({
      method: 'get',
      url: '/checkAuth',
    })
      .then((response) => {
        console.log('response:', response.data);
        this.setState({
          isAuthenticated: response.data.isAuthenticated,
        });
      });
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


  logOut() {
    this.setState({
      isAuthenticated: false,
    });
    axios.get('/logout');
  }

  test() {
    console.log('AM I WorkING');
    axios.get('/test');
  }
  render() {
    switch (this.state.show) {
      case 'meeting':
        return <Meeting changeView={this.changeView} />;
      case 'response':
        return <Response changeView={this.changeView} />;

      default:
        return this.state.isAuthenticated ? (
          <Home changeView={this.changeView} logout={this.logOut} />
        ) : (
          <Login logIn={this.logIn} test={this.test} />
        );
    }
  }
}

export default App;

// this.state.isAuthenticated ?
//             <Home /> :
//             <Login logIn={this.logIn} />
