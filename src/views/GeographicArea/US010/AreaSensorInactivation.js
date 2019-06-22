import React from 'react';
import 'react-day-picker/lib/style.css';
import {inactivateSensorFromArea} from "./Actions010";
import {connect} from 'react-redux';
import {confirmAlert} from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';


class AreaSensorInactivation extends React.Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      id: 0,
      sensorId: '',
      isChecked: false
    };

    this.handleInputChange = attribute => event => {
      this.setState({
        [attribute]: event.target.value
      });
    };

  }

  componentWillMount () {
    this.setState( { isChecked: this.props.isChecked } );
  }

  submit = () => {
    this.setState( { isChecked: true } );
    confirmAlert({
      title: 'Confirm inactivation',
      message: 'Are you sure to inactivate ' + this.state.sensorId + ' from ' + this.state.id + '?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => this.handleSubmit()
        },
        {
          label: 'No',
          onClick: () => {
            this.setState( { isChecked: false } );

          }
        }
      ]
    });
  };

  handleSubmit() {
    this.props.onInactivateSensorFromArea(this.state);
  }


  render() {
    const isEnabled = this.state.isChecked != null;
    return (
      <>

        <label> Geographic area Id:
          <input value={this.state.id} type="number" placeholder={0} name="id" onChange={this.handleInputChange('id')}/>
        </label>

        <label> Area Sensor Id:
          <input value={this.state.sensorId} type="text" name="sensorId" placeholder="Sensor id"
                 onChange={this.handleInputChange('sensorId')}/>
        </label>

        <p>{''}</p>

        <div className="switch-container">
          <label>
            <input ref="switch" checked={this.state.isChecked } disabled={isEnabled} onChange={ this.submit } className="switch" type="checkbox" />
            <div>

              <div> </div>
            </div>
          </label>
        </div>
      </>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onInactivateSensorFromArea: ({id, sensorId}) => {
      dispatch(inactivateSensorFromArea({id, sensorId}))
    }
  }
};


export default connect(null, mapDispatchToProps)(AreaSensorInactivation);
