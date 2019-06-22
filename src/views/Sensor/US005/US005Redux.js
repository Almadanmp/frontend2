import React from 'react';
import {connect} from 'react-redux';
import {addSensorType} from './Actions005';
import {Button} from "reactstrap";
import CardBody from "reactstrap/es/CardBody";
import Card from "reactstrap/es/Card";
import {confirmAlert} from "react-confirm-alert";
import 'react-confirm-alert/src/react-confirm-alert.css'
import Message005 from "../US005Extra/Message005";
class US005Redux extends React.Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      isHidden: true,
      name: '',
      units: ''
    };

    this.handleInputChange = attribute => event => {
      this.setState({
        [attribute]: event.target.value
      });
    };

  }
  toggleHidden = () => this.setState({isHidden: false})

  submit = () => {
    confirmAlert({
      title: 'Confirm your new sensor',
      message: 'The new sensor has the following new configuration: Name: ' + this.state.name + '. | Units: ' + this.state.units + 'm. Do you want to proceed?',
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
    this.props.onPostType(this.state);
  }

  render() {

    const {name, units} = this.state;
    return (
      <div className="animated fadeIn">
        <Card><CardBody> Name:<span>  </span>
          <input value={this.state.name} type="text" name="name" placeholder="Name of the new sensor type"
                 onChange={this.handleInputChange('name')}/>

          <p></p>
          <label> Units:<span>  </span>
            <input value={this.state.units} type="text" name="units" placeholder="Unit measure used for this type"
                   onChange={this.handleInputChange('units')}/>
          </label>
          <p/>
          <Button style={{marginBottom: '1rem'}} onClick={(event) => {
            this.submit();
            this.toggleHidden()
          }}>Add sensor
            type</Button>
          {this.state.isHidden === false ?
            <Message005 name={this.state.name} units={this.state.units}/>:''}
        </CardBody>
        </Card>
      </div>
    );
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(US005Redux);
