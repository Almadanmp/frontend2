import React, {Component} from 'react';
import {Form, FormGroup, Input, Label} from "reactstrap";
import AreaSensorCreator from "./AreaSensorCreator";

class SensorSettings extends Component {

  constructor(props) {
    super(props);
    this.state = {
      item: [],
      isLoaded: false,
      geographicAreaId: '',
      value: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const token = localStorage.getItem('loginToken')
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
          item: json,
        })
      })
      .catch(console.log)
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }


  render() {

    var {isLoaded, item} = this.state;
    if (!isLoaded) {
      return (
        <div className="spinner-border" role="status">
          <span className="sr-only"> Loading...</span>
        </div>
      )
    } else {
      if (!item.error) {
        return (
          <div>
            <Form action="" method="post">
              <FormGroup>
                <Label>Select Sensor Type</Label>
                <Input type="select" name="select" id="select" value={this.state.value} onChange={this.handleChange}>
                  <option value="0" onChange={this.handleChange}>Please select the Sensor Type</option>
                  {item.map(items => (
                    <option value={items.name} key={items.name}>
                      Type: {items.name}
                    </option>
                  ))}
                </Input>
              </FormGroup>
            </Form>
            <AreaSensorCreator linkAdd={this.props.linkAdd} typeSensor={this.state.value}/>
          </div>
        );
      } else {
        return "ERROR: Non-authorized user."
      }
    }
  }
}

export default SensorSettings;
