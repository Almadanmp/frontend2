import React, {Component} from 'react';
import {Button} from 'reactstrap';
import US108Put from "./US108Put";
import US108BackButton from "./US108BackButton";
import {confirmAlert} from "react-confirm-alert";
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

class US108Button extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isHidden: true,
      name: this.props.name,
      floor: this.props.floor,
      width: this.props.width,
      length: this.props.length,
      height: this.props.height,
    }
  }

  submit = () => {
    confirmAlert({
      title: 'Confirm your room configuration',
      message: 'The room has the following new configuration: Floor: ' + this.props.floor + '. | Width: ' + this.props.width + 'm. | Length: ' + this.props.length + 'm. | Height: ' + this.props.height + 'm. Do you want to proceed?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => this.toggleHidden()
        },
        {
          label: 'No',
          onClick: () => {
          }
        }
      ]
    });
  };

  toggleHidden = () => this.setState({isHidden: false})

  render() {
    return (
      <div>
        <Button style={{backgroundColor: '#e4e5e6', marginBottom: '1rem'}} onClick={(event) => {
          this.submit();
        }}>Edit the
          room {this.props.name}</Button><US108BackButton/>
        {this.state.isHidden === false ?
        <US108Put name={this.props.name} floor={this.props.floor} width={this.props.width} length={this.props.length}
                  height={this.props.height} link={this.props.link}/>:''}
      </div>
    )
  }
}

export default US108Button;
