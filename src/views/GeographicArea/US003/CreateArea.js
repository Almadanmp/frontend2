import React from 'react';
import 'react-day-picker/lib/style.css';
import {Alert} from "reactstrap";
import {connect} from 'react-redux';

class CreateArea extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: ''
    };
  }

  render() {
    const {areas, error} = this.props;
    console.log(areas)
    const {name} = this.props;

    if ((areas.toString()).indexOf("ERROR") != -1) {
      return (
        <div>
          <div className="help-block"><Alert color="danger">ERROR: {error}</Alert></div>

        </div>
      )
    } else {
      return (
        <><h6><i className="fa fa-check-square-o fa-lg"/> The geographic area {name} has been created with success!</h6>
        </>
      );
    }

  }
}


const mapStateToProps = (state) => {
  return {

    loading: state.Reducers003.loading,
    areas: state.Reducers003.areas,
    error: state.Reducers003.error
  }
};


export default connect(mapStateToProps, null)(CreateArea);
