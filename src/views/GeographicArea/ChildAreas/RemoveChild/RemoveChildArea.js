import React from 'react';
import 'react-day-picker/lib/style.css';
import {Button} from "reactstrap";
import {removeChildFromArea} from "./Actions";
import {connect} from 'react-redux';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css


class RemoveChildArea extends React.Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  submit = () => {
    confirmAlert({
      title: 'Confirm to remove',
      message: 'Are you sure to remove '+this.props.area+'?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => this.handleSubmit()
        },
        {
          label: 'No',
          onClick: () => {}
        }
      ]
    });
  };

  handleSubmit() {
    this.props.onRemoveChild(this.props.link.href);
    console.log(this.props.link.href);
  }

  render() {
    return (
      <>
        <Button style={{backgroundColor: '#ffffff', marginBottom: '1rem'}} onClick={this.submit}>
          <i className="fa fa-minus-square-o fa-lg"></i>
        </Button>
      </>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onRemoveChild: (link) => {
      dispatch(removeChildFromArea({link}))
    }
  }
};

export default connect(null, mapDispatchToProps)(RemoveChildArea);
