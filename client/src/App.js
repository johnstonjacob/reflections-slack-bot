import React from 'react';
import './styles/App.css';
import Home from './components/home';
import Login from './components/login';
import Meeting from './components/meeting/meeting';
import axios from 'axios'

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


  componentDidMount(){
     axios({
      method: 'get',
      url:'/checkAuth',
      credentials: 'include',
   })
    .then((response)=>{
      console.log("response:", response.data)
    })
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

  // slackLogin(){
  //   axios.get("https://slack.com/oauth/authorize?scope=identity.basic,identity.email,identity.team,identity.avatar&client_id=371272898032.373869995077&redirect_uri=http://206.189.221.89/slack/auth")
  //   .then((response)=>{
  //     console.log("response on client side:", response)
  //   })
  // }

  render() {
    switch (this.state.show) {
      case 'meeting':
        return <Meeting />;

      default:
        return this.state.isAuthenticated ? (
          <Home changeView={this.changeView} />
        ) : (
          <Login logIn={this.logIn} />
        );
    }
  }
}

export default App;

// this.state.isAuthenticated ?
//             <Home /> :
//             <Login logIn={this.logIn} />
