import React, {Component} from 'react';


class SaveAreaSensor extends Component {

  constructor(props) {
    super(props);
    this.state = {
      error: '',
      item: [],
    }
  }


  componentDidMount() {
    const token = localStorage.getItem('loginToken')
    const sensorId = this.props.sensorId;
    const name = this.props.name;
    const dateStartedFunctioning = this.props.dateStartedFunctioning;
    const typeSensor = this.props.typeSensor;
    const latitude = this.props.latitude;
    const longitude = this.props.longitude;
    const altitude = this.props.altitude;

    console.log(this.props);
    fetch('https://smart-home-server-g2.herokuapp.com/sensors/areas/' + this.props.geographicAreaId + '/sensors', {
      method: 'post',
      headers: {
        'Authorization': token,
        "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({sensorId, name, dateStartedFunctioning, typeSensor, latitude, longitude, altitude})
    })
      .then(res => {
        if(res.status === 422) {
          this.state.error = '422'
        }
        else if (res.status === 409) {
          this.state.error = '409'
        }
        else if (res.status === 400){
          this.state.error = '400'
        }
        res.json()} )
      .then((json) => {
        this.setState({
          item: json,
        })
      })
  };


  render() {
      if(this.state.error === '422') {
        return (
        <div>
          The sensor you are trying to add has an invalid name.
        </div>
        )
      }
    else if(this.state.error === '409') {
      return (
        <div>
          A sensor with that ID already exists. Pick another ID before continuing.
        </div>
      )
    }
    else if(this.state.error === '400') {
      return (
      <div>
          The sensor you are trying to add has an invalid ID.
        </div>
      )
      }
    return (
      <div>
        The new sensor {this.props.error} {this.props.name} was successfully saved with the following ID: {this.props.sensorId}.
      </div>
    )
  }
}

export default SaveAreaSensor;
