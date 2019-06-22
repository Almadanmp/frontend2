import React from 'react';
import 'react-day-picker/lib/style.css';
import US006Button from './US006Button';
import DatePicker from "./DatePicker";
import CardHeader from "semantic-ui-react/dist/commonjs/views/Card/CardHeader";
import CardBody from "reactstrap/es/CardBody";

class AreaSensorCreator extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      typeSensor:this.props.typeSensor,
      name: '',
      sensorId: '',
      dateStartedFunctioning: '',
      latitude: '',
      longitude: '',
      altitude: ''
    };
  }

  handleInputChange = attribute => event => {
    this.setState({
      [attribute]: event.target.value
    });
  };

  handleDayPicker = (selectedDay) => {

    console.log("handleDayPicker:"+ JSON.stringify(selectedDay))
    if (selectedDay !== undefined) {
      const initialDay = selectedDay.toISOString().substring(0, 10);
      this.setState({dateStartedFunctioning: initialDay});
    }
  }

  render() {
    const {sensorId, name, latitude, longitude, altitude} = this.state;
    const numberOfMonths = 1;
    return (
      <div>
        <label>Sensor ID:
          <input value={sensorId} placeholder="Sensor00" type="text" name="sensorId" onChange={this.handleInputChange('sensorId')}/>
        </label>
        <span> Sensor name:
          <input value={name} placeholder="Sensor name" type="text" name="name" onChange={this.handleInputChange('name')}/>
        </span>
        <p></p>
        <label>Latitude:
          <input value={latitude} placeholder="0" type="number" name="latitude" onChange={this.handleInputChange('latitude')}/>
        </label>
        <span> Longitude:
          <input value={longitude} placeholder="0" type="number" name="longitude" onChange={this.handleInputChange('longitude')}/>
        </span>
        <span> Altitude:
          <input value={altitude} placeholder="0" type="number" name="altitude" onChange={this.handleInputChange('altitude')}/>
        </span>
        <p></p>
        <label>Date it started functioning:
          <p></p>
          <div>
            <CardHeader>
              <CardBody style={{backgroundColor: '#b9cfc5', border: '1px solid',
                borderRadius:'0.25rem' , borderColor: '#b9cfc5' , marginBottom: '1rem'}}>
              <span>
            <DatePicker getDays={this.handleDayPicker} numberOfMonths={numberOfMonths}/>
              </span>
              </CardBody>
            </CardHeader>
          </div>
        </label>
        <US006Button link={this.props.linkAdd} typeSensor={this.props.typeSensor} sensorId={this.state.sensorId} name={this.state.name} dateStartedFunctioning={this.state.dateStartedFunctioning}
        latitude={this.state.latitude} longitude={this.state.longitude} altitude={this.state.altitude}/>
      </div>
    )
  }
}

export default AreaSensorCreator;

