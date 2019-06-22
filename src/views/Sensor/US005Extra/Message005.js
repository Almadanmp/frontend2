import React from 'react';
import 'react-day-picker/lib/style.css';
import {Alert} from "reactstrap";
import {addSensorType} from "../US005/Actions005";
import {connect} from 'react-redux';

class Message005 extends React.Component {

  constructor(props) {
    super(props);
    //  this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      formerGrid: '',
      name: '',
    };
  }

  componentDidMount() {
    this.props.onPostType(this.props.name, this.props.units);
  }

  render() {
    const {listSensorTypes, error} = this.props;

    if ((listSensorTypes.toString()).indexOf("ERROR") != -1) {
      return (
        <div>
          <div className="help-block"><Alert color="danger">ERROR: {error}</Alert></div>

        </div>
      )
    } else {
      return (
        <><h6><i className="fa fa-check-square-o fa-lg"/> The sensor has been created!</h6>
        </>
      );
    }

  }
}

const mapStateToProps = (state) => {
  return {

    loading: state.Reducers005.loading,
    listSensorTypes: state.Reducers005.listSensorTypes,
    error: state.Reducers005.error
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onPostType: ({name, units}) => {
      dispatch(addSensorType(name, units))
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Message005);
