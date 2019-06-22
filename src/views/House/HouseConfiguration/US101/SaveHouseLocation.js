import React, {Component} from 'react';

class SaveHouseLocation extends Component {

  constructor(props) {
    super(props);
    this.state = {
      error: '',
      item: [],
    }
  }

  componentDidMount() {
    const token = localStorage.getItem('loginToken');
    const geographicAreaId = this.props.geographicAreaId;
    const street = this.props.street;
    const number = this.props.number;
    const zip = this.props.zip;
    const town = this.props.town;
    const country = this.props.country;
    const latitude = this.props.latitude;
    const longitude = this.props.longitude;
    const altitude = this.props.altitude

    console.log(this.props);
    fetch('https://smarthome-g2-server.herokuapp.com/house/', {
      method: 'put',
      headers: {
        'Authorization': token,
        "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({geographicAreaId, street, number, zip, town, country, latitude, longitude, altitude})
    })
      .then(res => {
        if(res.status === 422) {
          this.state.error = '422'
        }
        res.json()
        })
      .then((json) => {
        this.setState({
          item: json,
        })
      })
      .catch(console.log);
  };

  render() {
    if(this.state.error === '422') {
      return (
        <div>
          Please complete every field before continuing.
        </div>
      )
    }
    return (
      <div>
        <p>The house now has the following parameters:</p>
        <ul>
          <li>
            Geographic Area ID: {this.props.geographicAreaId}
          </li>
          <li>
            Address: {this.props.street}, {this.props.number}
          </li>
          <li>
            Zip Code: {this.props.zip} - {this.props.town}, {this.props.country}
          </li>
          <li>
            Latitude: {this.props.latitude}
          </li>
          <li>
            Longitude: {this.props.longitude}
          </li>
          <li>
            Altitude: {this.props.altitude}
          </li>
        </ul>
      </div>
    );
  }
}

export default SaveHouseLocation;
