import React, {Component} from 'react';
import { Button} from 'reactstrap';
import US250GetSensors from "./US250GetSensors";


class US250Button extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isHidden: true,
      roomID: ''
    }
  }

  toggleHidden = ()=>this.setState((prevState)=>({isHidden: !prevState.isHidden}));
  render(){
    return(
      <div>
     <Button style={{backgroundColor: '#e4e5e6', marginBottom: '1rem'}} onClick={this.toggleHidden}>Get the Room Sensors</Button>
        {!this.state.isHidden && <US250GetSensors roomID = {this.props.roomID}/>}
      </div>
    )
  }
}

export default US250Button;
