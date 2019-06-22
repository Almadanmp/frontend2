import React from 'react';
import 'react-day-picker/lib/style.css';
import {Alert} from "reactstrap";
import {connect} from 'react-redux';

class US253Post extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: ''
    };
  }

  render() {
    const {sensor, error} = this.props;
    console.log(sensor)
    const {geographicAreaId, typeSensor, name, sensorId, dateStartedFunctioning} = this.props;

    if ((sensor.toString()).indexOf("ERROR") != -1 ) {
      return (
        <div>
          <div className="help-block"><Alert color="danger">{sensor}</Alert></div>
        </div>
      )
    }else {
      return (
        <div className="help-block"><Alert color="success">
          <p>The following sensor was added:</p>
          <ul>
            <li>
              Name: {name}, ID: {sensorId}
            </li>
            <li>
              Type: {typeSensor}
            </li>
            <li>
              Geographic Area ID: {geographicAreaId}
            </li>
            <li>
              Start Date: {dateStartedFunctioning}
            </li>
          </ul>
        </Alert></div>
      );
    }

  }
}


const mapStateToProps = (state) => {
  return {
    loading: state.Reducers253.loading,
    sensor: state.Reducers253.sensor,
    error: state.Reducers253.error
  }
};
export default connect(mapStateToProps, null)( US253Post);
