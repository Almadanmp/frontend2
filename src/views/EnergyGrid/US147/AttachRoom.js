import React from 'react';
import 'react-day-picker/lib/style.css';
import {Alert} from "reactstrap";

class AttachRoom extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
    };
  }


  render() {
    const {room, error} = this.props;

    if ((room.toString()).indexOf("ERROR") != -1) {
      return (
        <div>
          <div className="help-block"><Alert color="danger">{error}</Alert></div>

        </div>
      )
    }
    else {
        return (
        <div>
          <div className="help-block"><Alert color="success">The room has been successfully attached.</Alert></div>
        </div>
      );
    }

  }
}

export default AttachRoom;
