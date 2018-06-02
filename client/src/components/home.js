import React from 'react';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    // console.log('Render Home', this.props);
    return (
      <div>

        <h1>Home Screen</h1>
        {/* <button onClick={() => { console.log(this.state); }} >Home State</button> */}
        {/* <button onClick={() => { console.log(this.props); }} >Home Props</button> */}


        {/* <button onClick ={() => {}} > Username GET request </button>
        <button onClick= {() => {}} > Message POST request </button> */}


      </div>
    );
  }
}
export default Home;
