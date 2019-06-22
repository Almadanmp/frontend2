import React, {Component} from 'react';
import {Form, FormGroup, Input, Label} from "reactstrap";
import RoomSensorCreator from "./RoomSensorCreator";

class SensorTypesSelect extends Component {

  constructor(props) {
    super(props);
    this.state = {
      types: [],
      isLoaded: false,
      roomID: 0,
      typeSensor: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const token = localStorage.getItem('loginToken');
    fetch('https://smarthome-g2-server.herokuapp.com/rooms/types', {
        headers: {
          'Authorization': token,
          "Access-Control-Allow-Credentials": true,
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json"
        }
      }
    )
      .then(res => res.json())
      .then((json) => {
        this.setState({
          isLoaded: true,
          types: json,
        })
      })
      .catch(console.log)
  }


  handleChange(event) {
    this.setState({typeSensor: event.target.value});
    console.log(this.state.typeSensor)
  }


  render() {

    var {isLoaded, types} = this.state;
    if (!isLoaded) {
      return (<div className = "spinner-border" role = "status" >
        <span className = "sr-only" > Loading...</span>
      </div>)
    } else {
      if (!types.error) {
      return (
        <div style={{
          textAlign: "center"
        }}>
          <Form action="" method="post">
            <FormGroup>
              <Label>Select Sensor Type</Label>
              <Input type="select" name="select" id="select" value={this.state.value} onChange={this.handleChange}>
                <option value="" onChange={this.handleChange}>Please select the Sensor Type</option>
                {types.map(type => (
                  <option value={type.name} key={type.name}>
                    Type: {type.name}
                  </option>
                ))}
              </Input>
            </FormGroup>
          </Form>
          <RoomSensorCreator roomID = {this.props.roomID} typeSensor = {this.state.typeSensor} link={this.props.linkAdd} />
        </div>
      );
      } else {
        return "ERROR: Non-authorized user."
      }
    }
  }
}

export default SensorTypesSelect;
