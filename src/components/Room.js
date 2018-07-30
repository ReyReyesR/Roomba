import React from 'react';
import Square from './Square'
import '../index.css';

export default class Room extends React.Component {
  constructor(props){
    super(props);
    this.state = this.props.location.state;
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.moveUp = this.moveUp.bind(this);
    this.moveDown = this.moveDown.bind(this);
    this.moveLeft = this.moveLeft.bind(this);
    this.moveRight = this.moveRight.bind(this);
  }
  componentDidMount(){
    document.addEventListener("keydown", this.handleKeyPress, false);
  }
  componentWillUnmount(){
    document.removeEventListener("keydown", this.handleKeyPress, false);
  }

  renderSquare = (i, roomba, dust) => {
    if (roomba) return <Square value={'R'} key={i} />
    else if (dust) return <Square value={'D'} key={i} />
    else return <Square value={''} key={i} />
  }

  moveUp = (roombaY, roomY) => ((++roombaY < roomY) ? this.setState(() => ({ roombaY })) : '')
  moveDown = (roombaY, roomY) => ((--roombaY >= 0) ? this.setState(() => ({ roombaY })) : '')
  moveRight = (roombaX, roomX) => ((++roombaX < roomX) ? this.setState(() => ({ roombaX })) : '')
  moveLeft = (roombaX, roomX) => ((--roombaX >= 0) ? this.setState(() => ({ roombaX })) : '')
  

  handleKeyPress = (e) => {
    if (e.keyCode === 37) this.moveLeft(this.state.roombaX, this.state.roomX);
    if (e.keyCode === 38) this.moveUp(this.state.roombaY, this.state.roomY);
    if (e.keyCode === 39) this.moveRight(this.state.roombaX, this.state.roomX);
    if (e.keyCode === 40) this.moveDown(this.state.roombaY, this.state.roomY);
  }

  render() {
    let array = [];
    let items = [];
    let val = 0;
    for (let j = this.state.roomY-1; j >= 0; j--) {
     for (let i = 0; i < this.state.roomX; i++) {
       val = i + (this.state.roomX * j);
       if (j === this.state.roombaY && i === this.state.roombaX) items.push(this.renderSquare(val, true, false ));
       else if (this.state.coordinates.find(element=>{return element.x === i && element.y === j})) items.push(this.renderSquare(val, false, true ));
       else items.push(this.renderSquare(val, false, false ));
      }
      array.push(<div className="board-row" key={j}> {items} </div>);
      items = [];
    }

    return (
      <div>
        <input className="hidden"/>
        {array}
      </div>
    );
  }
}