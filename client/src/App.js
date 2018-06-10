import React from 'react';
import axios from 'axios';
import './styles/App.css';
import Home from './components/home';
import Login from './components/login';
import Meeting from './components/meeting';
import Response from './components/studentResponse';

axios.defaults.withCredentials = true;

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      show: 'home',
      isAuthenticated: true,
      student: '',
    };

    this.changeView = this.changeView.bind(this);
    this.logIn = this.logIn.bind(this);
    this.logOut = this.logOut.bind(this);
    // this.test = this.test.bind(this);
    this.getStudent = this.getStudent.bind(this);
  }


  // when component mounts, checks server authentication
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

  // when student is selected, changes state to the ID of selected student
  getStudent(e) {
    this.setState({
      student: e.target.value,
      show: 'meeting',
    });
  }

  // function to change current view
  changeView(view) {
    this.setState({
      show: view,
    });
  }


  // helper function for logging in during development
  logIn() {
    this.setState({
      isAuthenticated: true,
    });
  }


  // function to log out of session
  logOut() {
    this.setState({
      isAuthenticated: false,
    });
    axios.get('/logout');
  }

  // test() {
  //   console.log('AM I WorkING');
  //   axios.get('/test');
  // }

  render() {
    switch (this.state.show) {
      case 'meeting':
        return <Meeting changeView={this.changeView} student={this.state.student} />;
      case 'response':
        return <Response changeView={this.changeView} />;

      default:
        return this.state.isAuthenticated ? (
          <Home
            changeView={this.changeView}
            logout={this.logOut}
            student={this.state.student}
            getStudent={this.getStudent}
          />
        ) : (
          <Login logIn={this.logIn} test={this.test} />
        );
    }
  }
}

export default App;

