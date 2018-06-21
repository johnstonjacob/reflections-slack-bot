import React from 'react';
import axios from 'axios';
import './styles/App.css';

import Home from './components/home';
import Meeting from './components/meeting';
import Login from './components/login';

export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
      view: 'home',
      isAuthenticated: false,
      student: '',
      history: '',
    };

    this.routes = {
      home: () => <Home logOut={this.logOut} getStudent={this.getStudent} />,
      meeting: () => (
        <Meeting
          changeView={this.changeView}
          student={this.state.student}
          history={this.state.history}
        />
      ),
      login: () => <Login logIn={this.logIn} />,
    };
    this.changeView = this.changeView.bind(this);
    this.logIn = this.logIn.bind(this);
    this.logOut = this.logOut.bind(this);
    this.getStudent = this.getStudent.bind(this);
  }

  async componentWillMount() {
    const options = {
      method: 'get',
      url: 'reflections/checkAuth',
    };

    const result = await axios(options);
    this.setState({ isAuthenticated: result.data.isAuthenticated });
  }

  getStudent(e) {
    this.setState({
      student: e.target.value,
      view: 'meeting',
      history: JSON.parse(e.target.value)
        .slice(1)
        .reverse(),
    });
  }

  changeView(view) {
    this.setState({
      view,
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
    axios.get('/reflections/logout');
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Reflections</h1>
        </header>
        {this.state.isAuthenticated ? this.state.view() : <Login logIn={this.logIn} />}
      </div>
    );
  }
}
