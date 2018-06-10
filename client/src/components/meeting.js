import React from 'react';
import {
  Form,
  FormGroup,
  Input,
  Label,
  Container,
  Col,
  Row,
  Button,
  Collapse,
} from 'reactstrap';
import axios from 'axios';
import PropTypes from 'prop-types';

class Meeting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      student: this.props.student.split(',')[0],
      notes: '',
      message: '',
    };
    this.notesChange = this.notesChange.bind(this);
    this.messageChange = this.messageChange.bind(this);
    this.submitMessage = this.submitMessage.bind(this);
  }

  notesChange(e) {
    this.setState({
      notes: e.target.value,
    });
  }

  messageChange(e) {
    this.setState({
      message: e.target.value,
    });
  }

  submitMessage() {
    axios
      .post('/dash/postmessage', {
        student: this.state.student,
        notes: this.state.notes,
        message: this.state.message,
      });
  }

  render() {
    return (
      <div className="App">

        {/* <button onClick={() => { console.log(this.state); }}>Meeting State</button>
        <button onClick={() => { console.log(this.props); }}>Meeting Props</button> */}

        <header className="App-header">
          <h1 className="App-title">LindenBot</h1>
        </header>
        <Collapse isOpen={this.state.meetingDrop}>
          <button onClick={() => { this.props.changeView('home'); }} > Home </button>

          <h1>Meeting Screen for {this.props.student.split(',')[1]}</h1>

          <Container>
            <Form>
              <FormGroup>
                <Label for="exampleText">Notes</Label>
                <Row>
                  <Col>
                    <Input
                      type="textarea"
                      name="text"
                      id="exampleText"
                      placeholder="1-on-1 notes"
                      value={this.state.notes}
                      onChange={this.notesChange}
                    />
                  </Col>
                </Row>
              </FormGroup>
              <FormGroup>
                <Label for="exampleText">Message</Label>
                <Input
                  type="textarea"
                  name="text"
                  id="exampleText"
                  placeholder="Message to student"
                  value={this.state.message}
                  onChange={this.messageChange}
                />
              </FormGroup>
              <Button onClick={this.submitMessage}> Submit </Button>
            </Form>
          </Container>
        </Collapse>
      </div>
    );
  }
}
export default Meeting;

Meeting.propTypes = {
  changeView: PropTypes.func.isRequired,
  student: PropTypes.string.isRequired,
};
