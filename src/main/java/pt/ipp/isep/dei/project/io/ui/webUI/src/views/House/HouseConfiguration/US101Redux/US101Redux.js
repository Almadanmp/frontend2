import React from 'react';
import {connect} from 'react-redux';
import {fetchLocation} from './ActionsUS101';
import {Alert, Button, Form, FormGroup, Input, Label} from "reactstrap";
import CreateLocation from './CreateLocation';

class US101Redux extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      isHidden: true,
      item: [],
      geographicAreaId: '',
      street: '',
      number: '',
      zip: '',
      town: '',
      country: '',
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
    fetch('https://localhost:8443/geoAreas/', {
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
    this.setState({typeArea: event.target.value});
  }

  handleSubmit() {
    this.props.onFetchLocation(this.state);
    this.setState({isHidden: false})
  }

  render() {
    const {item} = this.state;
    const {location, error} = this.props;

    if ((location.toString()).indexOf("ERROR") !== -1) {
      return (
        <div>
          <div className="help-block"><Alert color="danger">ERROR: {error}</Alert></div>

        </div>
      )
    } else {
      return (
        <>
          <Form action="" method="post">
            <FormGroup>
              <Label>Select Geographic Area</Label>
              <Input type="select" name="select" id="select" value={this.state.value} onChange={this.handleChange}>
                <option value="0" onChange={this.handleChange}>Please select the Geographic Area</option>
                {item.map(items => (
                  <option value={items.geographicAreaId} key={items.geographicAreaId}>
                    Name: {items.name}
                  </option>
                ))}
              </Input>
            </FormGroup>
          </Form>
          <p></p>
          <label>Street:
            <input value={street} type="text" name="street" placeholder="Street"
                   onChange={this.handleInputChange('street')}/>
          </label>
          <span> Number:
          <input value={number} type="number" name="number" placeholder="Number"
                 onChange={this.handleInputChange('number')}/>
        </span>
          <span> Zip:
          <input value={zip} type="number" name="zip" placeholder="Zip"
                 onChange={this.handleInputChange('zip')}/>
        </span>
          <p></p>
          <label>Town:
            <input value={town} type="text" name="town" placeholder="Town"
                   onChange={this.handleInputChange('town')}/>
          </label>
          <span> Country:
          <input value={country} type="text" name="country" placeholder="Country"
                 onChange={this.handleInputChange('country')}/>
        </span>
          <p></p>
          <span> Latitude:
          <input value={latitude} type="number" name="latitude" placeholder="0"
                 onChange={this.handleInputChange('latitude')}/>
        </span>
          <span> Longitude:
          <input value={longitude} type="number" name="longitude" placeholder="0"
                 onChange={this.handleInputChange('longitude')}/>
        </span>
          <span> Altitude:
          <input value={altitude} type="number" name="altitude" placeholder="0"
                 onChange={this.handleInputChange('altitude')}/>
        </span>
          <p></p>
          <Button style={{backgroundColor: '#e4e5e6', marginBottom: '1rem'}} onClick={this.handleSubmit}>Save new
            location
          </Button>
          {this.state.isHidden === false ?
            <CreateLocation geographicAreaId={this.state.geographicAreaId} street={this.state.street} number={this.state.number}
            zip={this.state.zip} town={this.state.town} country={this.state.country} latitude={this.state.latitude}
            longitude={this.state.longitude} altitude={this.state.altitude}/> : ''}
        </>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.Reducers101.loading,
    location: state.Reducers101.location,
    error: state.Reducers101.error
  }
};

const
  mapDispatchToProps = (dispatch) => {
    return {
      onFetchLocation: ({geographicAreaId, street, number, zip, town, country, latitude, longitude , altitude}) => {
        dispatch(fetchLocation({geographicAreaId, street, number, zip, town, country, latitude, longitude , altitude}))
      }
    }
  };

export default connect(mapStateToProps, mapDispatchToProps)(US101Redux);
