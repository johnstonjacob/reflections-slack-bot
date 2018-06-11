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
      allStudents: {},
      cohorts: [],
      members: [],
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
        }, ()=>{console.log('AllStudentState:', this.state.allStudents)});
        console.log(response)
      })
      .catch(console.error);
  }

  getMembers(e) {
    const membersArray = [];
    console.log(this.state.allStudents)
    // e.target.value.split(',').forEach((item) => {
      Object.keys(this.state.allStudents).forEach((key) => {
        const val = this.state.allStudents[key]
        console.log(val)
        // if (val[0] === item) {
          membersArray.push(val);
        // }
      });
    // });
    console.log(membersArray)

    this.setState({ members: membersArray });
  }

  render() {
    return (
      <div className="App">

        <button onClick={() => { console.log(this.state); }}>Home State</button>
        <button onClick={() => { console.log(this.props); }}>Home Props</button>

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
                <Col key={person[0][0]}>
                  <Button outline color="success" onClick={this.props.getStudent} value={person}>
                    {person[0][1]}
                  </Button>
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
  logout: PropTypes.func.isRequired,
  getStudent: PropTypes.func.isRequired,
};


export default Home;
