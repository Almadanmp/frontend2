import React, {Component} from 'react';
import { Button} from 'reactstrap';
import SaveAreaSensor from "./SaveAreaSensor";


class US006Button extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isHidden: true,
      geographicAreaId:this.props.geographicAreaId,
      typeSensor:this.props.typeSensor,
      name: this.props.name,
      sensorId: this.props.sensorId,
      dateStartedFunctioning: this.props.dateStartedFunctioning,
      latitude: this.props.latitude,
      longitude: this.props.longitude,
      altitude: this.props.altitude
    }
  }


  toggleHidden = ()=>this.setState((prevState)=>({isHidden: !prevState.isHidden}))

  render(){
    return(
      <div>
        <Button style={{backgroundColor: '#e4e5e6', marginBottom: '1rem'}} onClick={this.toggleHidden}>Save new sensor</Button>
        {!this.state.isHidden && <SaveAreaSensor geographicAreaId={this.props.geographicAreaId} typeSensor={this.props.typeSensor}
                                                 sensorId={this.props.sensorId} name={this.props.name}
                                                 dateStartedFunctioning={this.props.dateStartedFunctioning}
                                                 latitude={this.props.latitude} longitude={this.props.longitude}
                                                 altitude={this.props.altitude}/>}
      </div>
    )
  }
}

export default US006Button;
