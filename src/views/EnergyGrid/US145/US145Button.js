import React, {Component} from 'react';
import { Button} from 'reactstrap';
import US145GetRooms from "./US145GetRooms";


class US145Button extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isHidden: true,
      gridID: ''
    }
  }

  toggleHidden = ()=>this.setState((prevState)=>({isHidden: !prevState.isHidden}));

  render(){
    return(
      <div>
     <Button style={{backgroundColor: '#e4e5e6', marginBottom: '1rem'}} onClick={this.toggleHidden}>Get the Rooms</Button>
        {!this.state.isHidden && <US145GetRooms gridID = {this.props.gridID}/>}
      </div>
    )
  }
}

export default US145Button;
