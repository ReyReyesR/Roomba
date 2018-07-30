import React from 'react';
import { Link } from "react-router-dom";
//import ReactDOM from 'react-dom';

class RoomForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      roomX: '',
      roomY: '',
      roombaX: '',
      roombaY: '',
      values:[]
    };
  }
  onRoomXChange = e => {
    const roomX = e.target.value;
    if (!roomX || roomX > 0 ) {
      this.setState(() => ({ roomX }));
    }
  }
  onRoomYChange = e => {
    const roomY = e.target.value;
    if (!roomY || roomY > 0 ) {
      this.setState(() => ({ roomY }));
    }
  }
  render() {
    return (
      <div>
        <h1>Tray.io Techtest</h1>
        <p> Please enter the size of the room</p>
        <div>
          X:<input type='text' pattern="[0-9]*" 
            value={this.state.roomX}
            onChange={this.onRoomXChange}
            />   
          Y:<input type='text' pattern="[0-9]*"
            value={this.state.roomY}
            onChange={this.onRoomYChange}
            /> 
        </div>
        <Link className="button" to={{pathname:"/roombaForm", state:{state: this.state}}} >
          Next
        </Link>
      </div>
    );
  }
}

export default RoomForm;