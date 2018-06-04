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
    };

    this.getMembers = this.getMembers.bind(this);
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

  getMembers(e) {
    console.log('members: ', e.target.value);
    const membersArray = [];
    e.target.value.split(',').forEach((item) => {
      membersArray.push(item);
    });
    console.log(membersArray);


    this.setState({ members: membersArray });
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
          <h4>{person}</h4>
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
