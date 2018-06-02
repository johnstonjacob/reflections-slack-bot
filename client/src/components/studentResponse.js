import React from 'react';

class studentResponse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    // console.log('Render studentResponse', this.props);
    return (
      <div>
        studentResponse
        {/* <button onClick={() => { console.log(this.state); }} >studentResponse State</button> */}
        {/* <button onClick={() => { console.log(this.props); }} >studentResponse Props</button> */}
      </div>
    );
  }
}
export default studentResponse;
