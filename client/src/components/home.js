import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cohorts: [],
    };
  }

  componentDidMount() {
    axios.get('/dash/getchannels', {})
      .then((response) => {
        console.log(response.data);
        this.setState({
          cohorts: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }


  render() {
    return (
      <div className="App">

        <header className="App-header">
          <h1 className="App-title">LindenBot</h1>
        </header>

        <button
          onClick={() => {
            console.log(this.state);
          }}
        >
          Meeting State
        </button>
        <button
          onClick={() => {
            console.log(this.props);
          }}
        >
          Meeting Props
        </button>

        <h1>Home Screen</h1>

        <button onClick={() => { this.props.changeView('meeting'); }} > Message Page </button>
        {this.state.cohorts.map(cohort => (
          <h5 key={cohort.id}>{cohort.cohort.name}</h5>
        ))}

      </div>
    );
  }
}

Home.propTypes = {
  changeView: PropTypes.func.isRequired,
};

export default Home;

// const RepoList = props => (
//   <div>
//     {props.repos.map(repo => (
//       <ul className="repos" key={repo.id}><a href={repo.url}>{repo.name}</a>
//         <h5>By: {repo.owner}</h5>
//         <h6>{repo.description}</h6>
//       </ul>
// ))}
//   </div>
// );
