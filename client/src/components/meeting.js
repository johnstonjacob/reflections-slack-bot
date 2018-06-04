import React from 'react';
import {
  Form,
  FormGroup,
  Input,
  Label,
  InputGroup,
  InputGroupAddon,
  Container,
  Col,
  Row,
  Button,
} from 'reactstrap';
import axios from 'axios';

class Meeting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      student: '',
      notes: '',
      message: '',
    };
    this.studentChange = this.studentChange.bind(this);
    this.notesChange = this.notesChange.bind(this);
    this.messageChange = this.messageChange.bind(this);
    this.submitMessage = this.submitMessage.bind(this);
  }

  studentChange(e) {
    this.setState({
      student: e.target.value,
    });
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
    console.log(`Student Name: ${this.state.student}`);
    console.log(`Notes: ${this.state.notes}`);
    console.log(`Message: ${this.state.message}`);
    axios
      .post('/dash/postmessage', {
        student: this.state.student,
        notes: this.state.notes,
        message: this.state.message,
      })
      .then((response) => {
        console.log(response.data);
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

        <h1>Meeting Screen</h1>

        <Container>
          <InputGroup>
            <InputGroupAddon addonType="prepend">@</InputGroupAddon>
            <Input
              placeholder="Student Username"
              value={this.state.student}
              onChange={this.studentChange}
            />
          </InputGroup>
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
      </div>
    );
  }
}
export default Meeting;
