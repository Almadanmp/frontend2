import React, {Component} from 'react';
import { Button} from 'reactstrap';
import US253Post from "./US253Post";


class US253Button extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isHidden: true,
      roomID:this.props.roomID,
      typeSensor:this.props.typeSensor,
      name: this.props.name,
      sensorId: this.props.sensorId,
      dateStartedFunctioning: this.props.dateStartedFunctioning,
    }
  }


  toggleHidden = ()=>this.setState((prevState)=>({isHidden: !prevState.isHidden}))

  render(){
    return(
      <div>
        <Button style={{backgroundColor: '#e4e5e6', marginBottom: '1rem'}} onClick={this.toggleHidden}>Create a sensor of the type {this.props.typeSensor} in the room {this.props.roomID}</Button>
        {!this.state.isHidden && <US253Post  link={this.props.link} typeSensor={this.props.typeSensor} sensorId={this.props.sensorId} name={this.props.name} dateStartedFunctioning={this.props.dateStartedFunctioning}/>}
      </div>
    )
  }
}

export default US253Button;
