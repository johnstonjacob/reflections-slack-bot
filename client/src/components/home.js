import React from 'react';
import PropTypes from 'prop-types';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div className="App">

        <header className="App-header">
          <h1 className="App-title">LindenBot</h1>
        </header>


        <h1>Home Screen</h1>

        <button onClick={() => { this.props.changeView('meeting'); }} > Message Page </button>
      </div>
    );
  }
}

Home.propTypes = {
  changeView: PropTypes.func.isRequired,
};

export default Home;
