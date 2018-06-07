import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import {
  Container,
  Button,
  Col,
  Row,
} from 'reactstrap';

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
        this.setState({
          cohorts: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });

    axios.get('/dash/getusers', {})
      .then((response) => {
        this.setState({
          allStudents: response.data,
        });
      })
      .catch((error) => {
        throw error;
      });
  }

  getMembers(e) {
    const membersArray = [];

    e.target.value.split(',').forEach((item) => {
      this.state.allStudents.forEach((tuple) => {
        if (tuple[0] === item) {
          membersArray.push(tuple);
        }
      });
    });

    this.setState({ members: membersArray });
  }


  render() {
    return (
      <div className="App">
        <button onClick={() => { console.log(this.state); }}>Meeting State</button>
        <button onClick={() => { console.log(this.props); }}>Meeting Props</button>
        <button onClick={() => this.props.logout()}>Logout</button>


        <header className="App-header">
          <h1 className="App-title">LindenBot</h1>
        </header>
        <h1>Home Screen</h1>

        <button onClick={() => { this.props.changeView('meeting'); }} > Message Page </button>
        <button onClick={() => { this.props.changeView('response'); }} > Response Page </button>

        <Container>
          <Row>
            <Col>
              <h1>Cohorts</h1>
              {this.state.cohorts.map(cohort => (
                <Col key={cohort.id} >
                  <Button
                    outline
                    color="primary"
                    key={cohort.id}
                    value={cohort.cohort.members}
                    onClick={this.getMembers}
                  >{cohort.cohort.name}
                  </Button>
                </Col>
            ))}
            </Col>
            <Col>
              <h1>Students</h1>
              {this.state.members.map(person => (
                <Col key={person[0]}>
                  <Button outline color="success">{person[1]}</Button>
                </Col>
              ))}
            </Col>
          </Row>
        </Container>

      </div>
    );
  }
}

Home.propTypes = {
  changeView: PropTypes.func.isRequired,
};

export default Home;
