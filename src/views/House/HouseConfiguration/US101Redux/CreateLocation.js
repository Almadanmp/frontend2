import React from 'react';
import 'react-day-picker/lib/style.css';
import {Alert} from "reactstrap";
import {connect} from 'react-redux';

class CreateLocation extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: ''
    };
  }

  render() {
    const {location, error} = this.props;
    console.log(location)
    const {geographicAreaId, street, number, zip, town, country, latitude, longitude, altitude} = this.props;

    if ((location.toString()).indexOf("422") != -1) {
      return (
        <div>
          <div className="help-block"><Alert color="danger">Please complete every field before continuing.</Alert></div>
        </div>
      )
    } else {
      return (
        <div className="help-block"><Alert color="success">
          <p>House's updated location:</p>
          <ul>
            <li>
              Geographic Area ID: {geographicAreaId}
            </li>
            <li>
              Address: {street}, {number}
            </li>
            <li>
              Zip Code: {zip} - {town}, {country}
            </li>
            <li>
              Latitude: {latitude}
            </li>
            <li>
              Longitude: {longitude}
            </li>
            <li>
              Altitude: {altitude}
            </li>
          </ul>
        </Alert></div>
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


export default connect(mapStateToProps, null)(CreateLocation);
