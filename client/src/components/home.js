import React from 'react';
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Form,
  FormGroup,
  Input,
  Label,
  InputGroup,
  InputGroupAddon,
  Container,
  Col,
  Row,
} from 'reactstrap';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownOpen: false,
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }

  render() {
    return (
      <div>

        <h1>Home Screen</h1>

        {/* <ButtonDropdown toggle={this.toggle} isOpen={this.state.dropdownOpen}> */}
          {/* <DropdownToggle caret>
          Is Alex homeless?
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem>Yes</DropdownItem>
            <DropdownItem>No</DropdownItem>
          </DropdownMenu>
        </ButtonDropdown> */}

        <Container>
          <InputGroup>
            <InputGroupAddon addonType="prepend">@</InputGroupAddon>
            <Input placeholder="Student Username" />
          </InputGroup>
          <Form>
            <FormGroup>
              <Label for="exampleText">Notes</Label>
              <Row>
                <Col>
                  <Input type="textarea" name="text" id="exampleText" placeholder="1-on-1 notes" />
                </Col>
              </Row>
            </FormGroup>
            <FormGroup>
              <Label for="exampleText">Message</Label>
              <Input type="textarea" name="text" id="exampleText" placeholder="Message to student" />
            </FormGroup>
          </Form>
        </Container>

        {/* <button onClick={() => { console.log(this.state); }} >Home State</button> */}
        {/* <button onClick={() => { console.log(this.props); }} >Home Props</button> */}
        {/* <button onClick ={() => {}} > Username GET request </button>
        <button onClick= {() => {}} > Message POST request </button> */}
      </div>
    );
  }
}
export default Home;
