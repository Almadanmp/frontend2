import React from 'react';
import 'react-day-picker/lib/style.css';
import {Alert, Button} from "reactstrap";
import {attachRoomGrid, fetchRoom} from "./Actions";
import {connect} from 'react-redux';

class Message105 extends React.Component {

  constructor(props) {
    super(props);
    //  this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      formerGrid: '',
      name: '',
    };
  }

  componentDidMount() {
    this.props.onFetchRoom(this.props.name, this.props.floor, this.props.width, this.props.length, this.props.height);
  }

  render() {
    const {room, error} = this.props;

    if ((room.toString()).indexOf("ERROR") != -1) {
      return (
        <div>
          <div className="help-block"><Alert color="danger">ERROR: {error}</Alert></div>

        </div>
      )
    } else {
      return (
        <><h6><i className="fa fa-check-square-o fa-lg"/> The room has been created!</h6>
        </>
      );
    }

  }
}


const mapStateToProps = (state) => {
  return {

    loading: state.Reducers105.loading,
    room: state.Reducers105.room,
    error: state.Reducers105.error
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchRoom: ({name, floor, width, length, height}) => {
      dispatch(fetchRoom({name, floor, width, length, height}))
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Message105);
