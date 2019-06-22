import React, {Component} from 'react';

import US130 from './US130'
import US145 from './US145/US145'
import US147 from './US147'
import US149 from './US149'
import RoomGrid from "./SmartGrid/RoomGrid"

class HouseConfiguration extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {collapse: false};
  }

  toggle() {
    this.setState(state => ({collapse: !state.collapse}));
  }

  render() {
    return (
      <div>
        <h2>Welcome to the Energy Grid Menu.</h2>
        <p></p>
        <RoomGrid/>
        <div className={"divCreateGrid"}><US130/></div>

      </div>
    );
  }
}

export default HouseConfiguration;
