import React from 'react';
import 'react-day-picker/lib/style.css';
import {fetchSensor} from "./Actions";
import {connect} from 'react-redux';
import US253Button from './US253Button';
import {Button, Card, CardBody, Collapse, Form, FormGroup, Input, Label} from "reactstrap";
import CardHeader from "semantic-ui-react/dist/commonjs/views/Card/CardHeader";
import DatePicker from "../../../GeographicArea/US006Redux/DatePicker";
import US253Post from "./US253Post";

class RoomSensorCreator extends React.Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      roomID:this.props.roomID,
      typeSensor:this.props.typeSensor,
      name: '',
      sensorId: '',
      dateStartedFunctioning: '',
      isHidden:true
    };
  }

    handleInputChange = attribute => event => {
      this.setState({
        [attribute]: event.target.value
      });
    };

  handleDayPicker = (selectedDay) => {

    console.log("handleDayPicker:" + JSON.stringify(selectedDay))
    if (selectedDay !== undefined) {
      const initialDay = selectedDay.toISOString().substring(0, 10);
      this.setState({dateStartedFunctioning: initialDay});
    }
  }

  handleSubmit(){
    this.props.onFetchSensor(this.props.link.href,this.props.typeSensor,this.state.name,this.state.sensorId,this.state.dateStartedFunctioning);
    this.setState({isHidden: false})
  }


  render() {
    const numberOfMonths = 1;
    const {sensorId, name} = this.state;
    console.log(this.props.typeSensor)
    return (
      <div>
        <label>Sensor ID:
        <input value={sensorId} placeholder="Sensor00" type="text" name="sensorId" onChange={this.handleInputChange('sensorId')}/>
        </label>
        <p></p>
        <label>Sensor name:
          <input value={name} placeholder="Sensor name" type="text" name="name" onChange={this.handleInputChange('name')}/>
        </label>
          <p></p>
        <p></p>
        <label>Date it started functioning:
          <p></p>
          <div>
            <CardHeader>
              <CardBody style={{
                backgroundColor: '#d1e7dd', border: '1px solid',
                borderRadius: '0.35rem', borderColor: '#b9cfc5', marginBottom: '1rem'
              }}>
              <span>
            <DatePicker getDays={this.handleDayPicker} numberOfMonths={numberOfMonths}/>
              </span>
              </CardBody>
            </CardHeader>
          </div>
        </label>
        <p></p>
        <Button style={{backgroundColor: '#e4e5e6', marginBottom: '1rem'}} onClick={this.handleSubmit}>Create a sensor of the type {this.props.typeSensor} in the room {this.props.roomID}</Button>
        {this.state.isHidden === false ?
          <US253Post link={this.props.link} typeSensor={this.props.typeSensor} sensorId={this.props.sensorId} name={this.props.name} dateStartedFunctioning={this.props.dateStartedFunctioning}/> : ''}
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchSensor: (link, typeSensor,name,sensorId,dateStartedFunctioning) => {
      dispatch(fetchSensor({link, typeSensor,name,sensorId,dateStartedFunctioning}))
    }
  }
};

export default connect(null,mapDispatchToProps)(RoomSensorCreator);

