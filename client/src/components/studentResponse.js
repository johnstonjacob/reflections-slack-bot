import React from 'react';
import PropTypes from 'prop-types';

class studentResponse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    // console.log('Render studentResponse', this.props);
    return (
      <div className="App">

        <button onClick={() => { console.log(this.state); }}>Response State</button>
        <button onClick={() => { console.log(this.props); }}>Response Props</button>

        <header className="App-header">
          <h1 className="App-title">LindenBot</h1>
        </header>
        <button onClick={() => { this.props.changeView('home'); }} > Home </button>
        <h1>Response Screen</h1>
        {/* <button onClick={() => { console.log(this.state); }} >studentResponse State</button> */}
        {/* <button onClick={() => { console.log(this.props); }} >studentResponse Props</button> */}
      </div>
    );
  }
}
export default studentResponse;

studentResponse.propTypes = {
  changeView: PropTypes.func.isRequired,
};
