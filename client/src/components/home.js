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
        Home
        {/* <button onClick={() => { console.log(this.state); }} >Home State</button> */}
        {/* <button onClick={() => { console.log(this.props); }} >Home Props</button> */}
      </div>
    );
  }
}
export default Home;
