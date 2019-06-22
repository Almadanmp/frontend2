import React, {Component} from 'react';
import US001 from "./US001";
import AreasList from './TableAreas/AreasList';

class Area extends Component {
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
        <h2>Welcome to the Geographic Area Menu</h2>
        <p></p>
        <AreasList/>
        <US001/>
      </div>
    );
  }
}

export default Area;
