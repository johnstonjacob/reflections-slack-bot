import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import {
  Container,
  Button,
  Col,
  Row,
  Collapse,
} from 'reactstrap';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allStudents: [],
      cohorts: [],
      members: [],
      homeDrop: false,
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

    setTimeout(() => {
      this.setState({
        homeDrop: true,
      });
    }, 1500);
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

        {/* <button onClick={() => { console.log(this.state); }}>Home State</button>
        <button onClick={() => { console.log(this.props); }}>Home Props</button>
        <button onClick={() => { this.props.changeView('meeting'); }} > Message Page </button>
        <button onClick={() => { this.props.changeView('response'); }} > Response Page </button> */}

        <header className="App-header">
          <h1 className="App-title">LindenBot</h1>
        </header>

        <Collapse isOpen={this.state.homeDrop}>
          <h1>Home Screen</h1>
          <Button outline color="danger" onClick={() => this.props.logout()}>Logout</Button>

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
                    <Button outline color="success" onClick={this.props.getStudent} value={person}>
                      {person[1]}
                    </Button>
                  </Col>
              ))}
              </Col>
            </Row>
          </Container>

        </Collapse>
      </div>
    );
  }
}

Home.propTypes = {
  // changeView: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  getStudent: PropTypes.func.isRequired,
};


export default Home;
