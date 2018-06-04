import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Button } from 'reactstrap';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cohorts: [],
      members: [],
      allStudents: [],
    };

    this.getMembers = this.getMembers.bind(this);
  }

  componentDidMount() {
    axios.get('/dash/getchannels', {})
      .then((response) => {
        // console.log(response.data);
        this.setState({
          cohorts: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });

    axios.get('/dash/getusers', {})
      .then((response) => {
        // console.log(response.data);
        this.setState({
          allStudents: response.data,
        });
      })
      .catch((error) => {
        throw error;
      });
  }

  getMembers(e) {
    // console.log('members: ', e.target.value);
    const membersArray = [];

    e.target.value.split(',').forEach((item) => {
      // console.log(item);
      this.state.allStudents.forEach((tuple) => {
        if (tuple[0] === item) {
          // console.log(tuple[1]);
          membersArray.push(tuple);
        }
      });
    });

    this.setState({ members: membersArray });
    // console.log(this.state.members);
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
        <button onClick={() => { this.props.changeView('meeting'); }} > Message Page </button>

        <h1>Home Screen</h1>

        {this.state.cohorts.map(cohort => (
          <Button
            outline
            color="primary"
            key={cohort.id}
            value={cohort.cohort.members}
            onClick={this.getMembers}
          >{cohort.cohort.name}
          </Button>
        ))}

        {this.state.members.map(person => (
          <h4 key={person[0]}>{person[1]}</h4>
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
