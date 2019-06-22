import React from 'react';
import 'react-day-picker/lib/style.css';
import {Alert} from "reactstrap";
import {connect} from 'react-redux';

class CreateLocation extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      mother: ''
    };
  }

  render() {
    const {added} = this.props;
    console.log(added)
    const {childId, motherId, mother} = this.props;
    console.log(motherId)
    if ((added.toString()).indexOf("409") !== -1) {
      return (
        <div>
          <div className="help-block"><Alert color="danger">Geographic area with ID: {childId} already belongs to
            {mother}. </Alert></div>
        </div>
      )
    }
    else if ((added.toString()).indexOf("422") !== -1) {
      return (
        <div>
          <div className="help-block"><Alert color="danger">You can't add a Geographic Area to itself.</Alert></div>
        </div>
      )
    }
    else if ((added.toString()).indexOf("403") !== -1 || (added.toString()).indexOf("Network Error") !== -1
      || (added.toString()).indexOf("404") !== -1 || (added.toString()).indexOf("405") !== -1) {
      return (
        <div>
          <div className="help-block"><Alert color="danger">Please select both
            Geographic Areas.</Alert></div>
        </div>
      )
    }
    else {
      return (
        <div className="help-block"><Alert color="success">
          <p>Geographic area with ID: {childId} was added to {mother}.</p>
        </Alert></div>
      );
    }
  }
}


const mapStateToProps = (state) => {
  return {
    loading: state.Reducers007.loading,
    added: state.Reducers007.added,
    error: state.Reducers007.error
  }
};


export default connect(mapStateToProps, null)(CreateLocation);
