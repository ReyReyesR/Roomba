import React from 'react';
import { Link } from "react-router-dom";
//import ReactDOM from 'react-dom';

const initialState = {
  roomX: undefined,
  roomY: undefined,
  roombaX: undefined,
  roombaY: undefined,
  coordinates:[{x:undefined, y:undefined}]
};

export default class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  reset = () => {
    this.setState(initialState);
  }

  onRoomXChange = e => {
    const roomX = e.target.value;
    if (!roomX || roomX > 0 ) {
      const roomY = Number(this.state.roomY);
      this.reset();
      this.setState(() => ({ roomX, roomY }));
    }
  }
  onRoomYChange = e => {
    const roomY = e.target.value;
    if (!roomY || roomY > 0 ) {
      const roomX = Number(this.state.roomX);
      this.reset();
      this.setState(() => ({ roomX, roomY }));
    }
  }

  onRoombaXChange = e => {
    const roombaX = Number(e.target.value);
    if ((!roombaX || roombaX >= 0) && this.state.roomX > roombaX) 
      this.setState(() => ({ roombaX }));
  }
  onRoombaYChange = e => {
    const roombaY = Number(e.target.value);
    if ((!roombaY || roombaY >= 0) && this.state.roomY > roombaY) 
      this.setState(() => ({ roombaY }));
  }

  dustPositions = () => {
    return this.state.coordinates.map((el, i) => 
      <div key={i}>
        X: <input type="text" pattern="[0-9]*" 
          value={el.x||''} 
          onChange={this.onDustXChange.bind(this, i)} />
        Y: <input type="text" pattern="[0-9]*"  
          value={el.y||''} 
          onChange={this.onDustYChange.bind(this, i)} />
        <input type='button' value='remove' onClick={this.removeClick.bind(this, i)}/>
      </div>          
    )
  }

  onDustXChange = (i, event) => {
    const dustX = Number(event.target.value);
    if ((!dustX || dustX >= 0) && this.state.roomX > dustX){
      let coordinates = [...this.state.coordinates];
      coordinates[i].x = dustX;
      this.setState({ coordinates });
    }
  }
  onDustYChange = (i, event) => {
    const dustY = Number(event.target.value);
    if ((!dustY || dustY >= 0) && this.state.roomY > dustY) {
      let coordinates = [...this.state.coordinates];
      coordinates[i].y = dustY;
      this.setState({ coordinates });
    }
  }

  addClick = () => {
    let target = this.state.coordinates[this.state.coordinates.length-1];
    if(target.x !== '' && target.y !== '') this.setState(prevState => ({ coordinates: [...prevState.coordinates, {x:'', y:''}]}))
  }

  removeClick = i => {
    let coordinates = [...this.state.coordinates];
    coordinates.splice(i,1);
    this.setState({ coordinates });
  }

  handleSubmit = event => {
    event.preventDefault();

  }
  render() {
    return (
      <div>
        <h1>Tray.io Techtest</h1>
        <div>
          <p> Please enter the size of the room</p>
          X:<input type='text' pattern="[0-9]*" 
            value={this.state.roomX || ''}
            onChange={this.onRoomXChange}
            disabled={this.state.roombaX || this.state.roombaY || this.state.coordinates[0].x || this.state.coordinates[0].y}
          /> 
          Y:<input type='text' pattern="[0-9]*"
            value={this.state.roomY || ''}
            onChange={this.onRoomYChange}
            disabled={this.state.roombaX || this.state.roombaY || this.state.coordinates[0].x || this.state.coordinates[0].y}
          /> 
        </div>
        <div className={this.state.roomX && this.state.roomY ? '' : 'hidden'}>
          <p> Please enter the initial position of the Roomba</p>
          X:<input type='text' pattern="[0-9]*" 
            value={this.state.roombaX || ''}
            onChange={this.onRoombaXChange}
          /> 
          Y:<input type='text' pattern="[0-9]*"
            value={this.state.roombaY || ''}
            onChange={this.onRoombaYChange}
          /> 
        </div>
        <div className={this.state.roomX && this.state.roomY ? '' : 'hidden'}>
        <p> Please enter the position of the dust particle(s) in the room</p>
        <form onSubmit={this.handleSubmit}>
          {this.dustPositions()}        
          <div>
            <input type='button' value='Add another' onClick={this.addClick.bind(this)}/>
            <Link className={this.state.roombaX && this.state.roombaY && this.state.coordinates[0].x && this.state.coordinates[0].y ? 'button' : 'hidden'}
            to={{pathname:"/room", state:{...this.state}}} >
              Next
            </Link>
          </div>
        </form>
        </div>
      </div>
    );
  }
}
