import React, {Component} from 'react';
import ImportGeographicAreas from "./importGA/ImportGA";
import ImportAreaReadings from "./importAreaReadings/ImportGAReadings";
import ImportHouse from "./importHouse/ImportHouse";
import ImportHouseSensors from "./importHouseSensors/ImportHouseSensors";
import ImportHouseReadings from "./importHouseReadings/ImportHouseReadings";

class Configuration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: false
    }
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(state => ({collapse: !state.collapse}));
  }

  render() {
    return (
      <>
        <h2>Welcome to the Application Configuration Menu </h2>
        <p></p>
        <h5>Please select the option you want to run:</h5>
        <p></p>
        <p></p>
        <p></p>
        <ImportGeographicAreas/>
        <ImportAreaReadings/>
        <ImportHouse/>
        <ImportHouseSensors/>
        <ImportHouseReadings/>
      </>
    );
  }
}


export default Configuration;


