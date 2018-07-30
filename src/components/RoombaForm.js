import React from 'react';
import { Link } from "react-router-dom";
//import ReactDOM from 'react-dom';

class RoombaForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      roombaX: '',
      roombaY: '',
    };
  }
  onRoombaXChange = e => {
    const roombaX = e.target.value;
    if ((!roombaX || roombaX > 0) && Number(this.props.location.state.state.roomX) >= Number(roombaX) ) this.setState(() => ({ roombaX }));
  }
  onRoombaYChange = e => {
    const roombaY = e.target.value;
    if ((!roombaY || roombaY > 0) && Number(this.props.location.state.state.roomY) >= Number(roombaY)) this.setState(() => ({ roombaY }));
  }
  render() {
    return (
      <div>
        <h1>Tray.io Techtest</h1>
        <p> Please enter the initial position of the Roomba</p>
        <div>
          X:<input type='text' pattern="[0-9]*" 
            value={this.state.roombaX}
            onChange={this.onRoombaXChange}
            /> 
          Y:<input type='text' pattern="[0-9]*"
            value={this.state.roombaY}
            onChange={this.onRoombaYChange}
            /> 
          <Link className="button"  to={{pathname:"/dustForm", state:{state: this.state}}} >
            Next
          </Link>
        </div> 
      </div>
    );
  }
}

export default RoombaForm;