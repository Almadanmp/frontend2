import React from 'react';
import 'react-day-picker/lib/style.css';
import {Button} from "reactstrap";
import {deleteSensorFromArea} from "./Actions";
import {connect} from 'react-redux';
import {confirmAlert} from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css


class AreaSensorRemover extends React.Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      id: 0,
      sensorId: '',
    };

    this.handleInputChange = attribute => event => {
      this.setState({
        [attribute]: event.target.value
      });
    };

  }

  submit = () => {
    confirmAlert({
      title: 'Confirm to remove',
      message: 'Are you sure to remove ' + this.props.sensorId + ' from ' + this.props.area + '?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => this.handleSubmit()
        },
        {
          label: 'No',
          onClick: () => {
          }
        }
      ]
    });
  };

  handleSubmit() {
    console.log(this.props.link.href)
    this.props.onDeleteSensorFromArea(this.props.link.href, this.props.sensorId);
  }

  render() {
    return (
      <>
        <Button style={{backgroundColor: '#ffffff', marginBottom: '1rem'}} onClick={this.submit}><i
          className="fa fa-minus-square-o fa-lg"></i> </Button>
      </>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onDeleteSensorFromArea: (href, sensorId) => {
      dispatch(deleteSensorFromArea({href, sensorId}))
    }
  }
};

export default connect(null, mapDispatchToProps)(AreaSensorRemover);
