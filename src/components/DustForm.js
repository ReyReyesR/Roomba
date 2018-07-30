import React from 'react';
//import ReactDOM from 'react-dom';

class DustForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        coordinates:[
          {
           x:'',
           y:''
          }
        ]
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  dustPositions = () => {
    return this.state.coordinates.map((el, i) => 
      <div key={i}>
        X: <input type="text" pattern="[0-9]*" 
          value={el.x||''} 
          onChange={this.handleChangeX.bind(this, i)} />
        Y: <input type="text" pattern="[0-9]*"  
          value={el.y||''} 
          onChange={this.handleChangeY.bind(this, i)} />
        <input type='button' value='remove' onClick={this.removeClick.bind(this, i)}/>
      </div>          
    )
  }

  handleChangeX = (i, event) => {
    let dustX = event.target.value;
    console.log(this.props.location.state.state.roomX);
    if ((!dustX || dustX > 0) && Number(this.props.location.state.state.roomX)){
      let coordinates = [...this.state.coordinates];
      coordinates[i].x = dustX;
      this.setState({ coordinates });
    }
  }

  handleChangeY = (i, event) => {
    let dustY = event.target.value;
    if ((!dustY || dustY > 0) && Number(this.props.location.state.state.roomY)) {
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
    alert('Room size: ' + this.state.roomX + ', '+ this.state.roomY + 'Data:' + this.state.values.join(', '));
    event.preventDefault();
  }
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          {this.dustPositions()}        
          <input type='button' value='add more' onClick={this.addClick.bind(this)}/>
          <input type="submit" value="Submit" />
      </form>
      </div>
    );
  }
}

export default DustForm;
