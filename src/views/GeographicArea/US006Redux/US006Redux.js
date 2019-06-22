import React from 'react';
import {connect} from 'react-redux';
import {fetchLocation} from './Actions006';
import {Button, Card, CardBody, Collapse, Form, FormGroup, Input, Label} from "reactstrap";
import SaveGASensor from './SaveGASensor';
import DatePicker from "./DatePicker";
import CardHeader from "semantic-ui-react/dist/commonjs/views/Card/CardHeader";

class US006Redux extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
    this.state = {
      isHidden: true,
      types: [],
      geographicAreaId: '',
      typeSensor: '',
      name: '',
      sensorId: '',
      dateStartedFunctioning: '',
      latitude: '',
      longitude: '',
      altitude: ''
    };

    this.handleInputChange = attribute => event => {
      this.setState({
        [attribute]: event.target.value
      });
    };

  }

  componentDidMount() {
    const token = localStorage.getItem('loginToken');
    fetch('https://smart-home-server-g2.herokuapp.com/rooms/types', {
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

  toggle() {
    this.setState(state => ({collapse: !state.collapse}));
  }

  handleChange(event) {
    this.setState({geographicAreaId: event.target.value});
  }

  handleChange2(event) {
    this.setState({typeSensor: event.target.value});
    console.log(this.state.typeSensor)
  }

  handleSubmit() {
    this.props.onFetchLocation(this.props.linkAdd.href,this.state.typeSensor, this.state.name, this.state.sensorId, this.state.dateStartedFunctioning, this.state.latitude, this.state.longitude, this.state.altitude);
    this.setState({isHidden: false})
  }

  handleDayPicker = (selectedDay) => {

    console.log("handleDayPicker:" + JSON.stringify(selectedDay))
    if (selectedDay !== undefined) {
      const initialDay = selectedDay.toISOString().substring(0, 10);
      this.setState({dateStartedFunctioning: initialDay});
    }
  }

  render() {
    const {types, name, sensorId, latitude, longitude, altitude} = this.state;
    const numberOfMonths = 1;

    return (
      <div>
        <Button onClick={this.toggle} className={"btn-pill"} style={{backgroundColor: '#93c4c4', marginBottom: '1rem'}}><i className="fa fa-plus-square-o fa-lg"/> Add
          Sensor </Button>
        <Collapse isOpen={this.state.collapse}>
          <Card style={{textAlign: "center"}}>
            <CardBody>
              <Form action="" method="post">
                <FormGroup>
                  <Label>Select Sensor Type</Label>
                  <Input type="select" name="select" id="select" value={this.state.value} onChange={this.handleChange2}>
                    <option value="" onChange={this.handleChange2}>Please select the Sensor Type</option>
                    {types.map(type => (
                      <option value={type.name} key={type.name}>
                        Type: {type.name}
                      </option>
                    ))}
                  </Input>
                </FormGroup>
              </Form>
              <p></p>
              <span>Sensor ID:
                <input value={sensorId} placeholder="Sensor ID" type="text" name="sensorId"
                       onChange={this.handleInputChange('sensorId')}/>
              </span>
              <span> Sensor name:
          <input value={name} placeholder="Sensor name" type="text" name="name"
                 onChange={this.handleInputChange('name')}/>
              </span>
              <p></p>
              <span>Latitude:
                <input value={latitude} placeholder="0" type="number" name="latitude"
                       onChange={this.handleInputChange('latitude')}/>
              </span>
              <span> Longitude:
          <input value={longitude} placeholder="0" type="number" name="longitude"
                 onChange={this.handleInputChange('longitude')}/>
        </span>
              <p></p>
              <span> Altitude:
          <input value={altitude} placeholder="0" type="number" name="altitude"
                 onChange={this.handleInputChange('altitude')}/>
              </span>
              <p></p>
              <label>Date it started functioning:
                <p></p>
                <div>
                  <CardHeader>
                    <CardBody style={{
                      backgroundColor: '#b9cfc5', border: '1px solid',
                      borderRadius: '0.25rem', borderColor: '#b9cfc5', marginBottom: '1rem'
                    }}>
              <span>
            <DatePicker getDays={this.handleDayPicker} numberOfMonths={numberOfMonths}/>
              </span>
                    </CardBody>
                  </CardHeader>
                </div>
              </label>
              <p></p>
              <Button style={{backgroundColor: '#e4e5e6', marginBottom: '1rem'}} onClick={this.handleSubmit}>Save
                changes
              </Button>
              {this.state.isHidden === false ?
                <SaveGASensor geographicAreaId={this.state.geographicAreaId} typeSensor={this.state.typeSensor}
                              name={this.state.name}
                              sensorId={this.state.sensorId} dateStartedFunctioning={this.state.dateStartedFunctioning}
                              latitude={this.state.latitude}
                              longitude={this.state.longitude} altitude={this.state.altitude}/> : ''}
            </CardBody>
          </Card>
        </Collapse>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.Reducers006.loading,
    location: state.Reducers006.location,
    error: state.Reducers006.error
  }
};

const
  mapDispatchToProps = (dispatch) => {
    return {
      onFetchLocation: (linkAdd, typeSensor, name, sensorId, dateStartedFunctioning, latitude, longitude, altitude) => {
        dispatch(fetchLocation({
          linkAdd,
          typeSensor,
          name,
          sensorId,
          dateStartedFunctioning,
          latitude,
          longitude,
          altitude
        }))
      }
    }
  };

export default connect(mapStateToProps, mapDispatchToProps)(US006Redux);
